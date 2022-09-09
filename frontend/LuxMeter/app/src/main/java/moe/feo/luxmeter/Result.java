package moe.feo.luxmeter;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.tomergoldst.tooltips.ToolTip;
import com.tomergoldst.tooltips.ToolTipsManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DecimalFormat;


public class Result extends AppCompatActivity implements ToolTipsManager.TipListener, View.OnClickListener {

    private static Result instance;
    private TextView classificacao, iluminacaoTitle,pavimentoTitle, pavimentoValue, areaTitle, areaValue, dprTitle, dprValue;
    private ImageView imagemEficiencia, helperIcon;

    private ConstraintLayout constraintLayout;

    private ToolTipsManager toolTipsManager;

    private static final DecimalFormat df = new DecimalFormat("0.00");

    private LottieAnimationView loadingAnimation, circleAnimation;

    private boolean isLoading = true; //flag para saber se a tela ainda está sendo carregada


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;
        setContentView(R.layout.activity_result);

        ActionBar actionBar = getSupportActionBar();

        //actionBar.setDisplayShowCustomEnabled(true);
        //actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
        //actionBar.setCustomView(R.layout.toolbar_title_layout);

        actionBar.setTitle("Eficiência da Sala");//titulo do header

        actionBar.setDisplayHomeAsUpEnabled(true); //botao de voltar no header


        //floatingGraphic = findViewById(R.id.floatingGraphic);

        iluminacaoTitle = findViewById(R.id.iluminacaoTitle);

        pavimentoTitle = findViewById(R.id.pavimentoTitle);

        pavimentoValue = findViewById(R.id.pavimentoValue);

        areaTitle = findViewById(R.id.areaTitle);

        areaValue = findViewById(R.id.areaValue);

        imagemEficiencia = findViewById(R.id.imagemEficiencia);

        loadingAnimation = findViewById(R.id.loadingAnimation);

        classificacao = findViewById(R.id.classificacao);

        circleAnimation = findViewById(R.id.circle);

        dprTitle = findViewById(R.id.dpirfTitle);

        dprValue = findViewById(R.id.dpirfValue);

        helperIcon = findViewById(R.id.helperIcon);

        toolTipsManager = new ToolTipsManager(this);

        helperIcon.setOnClickListener(this);

        constraintLayout = findViewById(R.id.constraint_layout);

        constraintLayout.setOnClickListener(this);



        String jsonQRCode = getIntent().getStringExtra("jsonQRCode");

        //classificacao.setText(getIntent().getStringExtra("iluminanceValue"));




        try {
            JSONObject jsonOBJ = new JSONObject(jsonQRCode);

            pavimentoValue.setText(jsonOBJ.getString("sala"));//seta o texto do nome do pavimento com o nome da sala obtido

            Double area = jsonOBJ.getDouble("largura")*jsonOBJ.getDouble("comprimento");

            areaValue.setText(df.format(area)+"m²");//seta o texto da area com o nome da sala obtido


            Double iluminanceValue = Double.valueOf(getIntent().getStringExtra("iluminanceValue").replace("lx","")); //se não tiver sensor de luz dará erro aqui

            jsonOBJ.put("iluminanciaMediaFinal",iluminanceValue);//add valor do sensor no json

            jsonOBJ.put("aparelho",getDeviceName());//add marca e modelo do aparelho ao json

            RequestQueue queue = Volley.newRequestQueue(this);

            String url = Api.baseURL+"eficienciaResultado";



            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                    (Request.Method.POST, url, jsonOBJ, new Response.Listener<JSONObject>() {

                        @Override
                        public void onResponse(JSONObject response) {
                            //response /resultado da API

                            try {

                                String resultadoClassificao = response.getString("classificacao");

                                String resultadoDpirf = df.format(response.getDouble("densidadePotIluminacaoRelativa"))+"W/m²/100lx";

                                classificacao.setText(resultadoClassificao);

                                if (resultadoClassificao.equals("A")){//Verde Escuro
                                    classificacao.setTextColor(Color.parseColor("#005224"));
                                }
                                else if (resultadoClassificao.equals("B")){//Verde Claro
                                    classificacao.setTextColor(Color.parseColor("#669128"));
                                }
                                else if (resultadoClassificao.equals("C")){//Amarelo
                                    classificacao.setTextColor(Color.parseColor("#FDE101"));
                                }
                                else if (resultadoClassificao.equals("D")){//Laranja
                                    classificacao.setTextColor(Color.parseColor("#F18A01"));
                                }
                                else {//Vermelho
                                    classificacao.setTextColor(Color.parseColor("#E02418"));
                                }

                                dprValue.setText(resultadoDpirf);

                                iluminacaoTitle.setVisibility(View.VISIBLE);
                                pavimentoTitle.setVisibility(View.VISIBLE);
                                pavimentoValue.setVisibility(View.VISIBLE);
                                areaTitle.setVisibility(View.VISIBLE);
                                areaValue.setVisibility(View.VISIBLE);
                                dprTitle.setVisibility(View.VISIBLE);
                                helperIcon.setVisibility(View.VISIBLE);
                                dprValue.setVisibility(View.VISIBLE);
                                imagemEficiencia.setVisibility(View.VISIBLE);
                                circleAnimation.setVisibility(View.VISIBLE);

                                classificacao.setVisibility(View.VISIBLE);
                                //floatingGraphic.setVisibility(View.VISIBLE);
                                loadingAnimation.setVisibility(View.INVISIBLE);

                                isLoading = false;

                            } catch (JSONException e) {
                                e.printStackTrace();


                            }


                        }
                    }, new Response.ErrorListener() {

                        @Override
                        public void onErrorResponse(VolleyError error) {//caso dê erro na conexão
                            // TODO: Handle error
                            Toast.makeText(Result.instance,"Falha de conexão!",Toast.LENGTH_LONG).show();
                            instance.finish();

                        }
                    });

            queue.add(jsonObjectRequest);

        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(Result.instance,"Este aparelho não possui sensor de luz!",Toast.LENGTH_LONG).show();
            instance.finish();
        }




    }

    private String getDeviceName() { //retorna o nome do celular que está sendo usado
        String manufacturer = Build.MANUFACTURER.toLowerCase();
        String model = Build.MODEL.toLowerCase();
        if (model.startsWith(manufacturer)) {
            return model;
        } else {
            return manufacturer + "-" + model;
        }
    }

    @Override
    public void onTipDismissed(View view, int anchorViewId, boolean byUser) {
        if (byUser){ //quando o usuario soltar o botao

        }

    }

    @Override
    public void onClick(View view) {

        switch (view.getId()){
            case R.id.helperIcon:
                int position = ToolTip.POSITION_ABOVE;
                int align = ToolTip.ALIGN_CENTER;
                displayTooltip(position,align);
                break;
            default: //caso clique em qualquer regiao da view entao tira o tooltip caso esteja visivel na tela
                toolTipsManager.findAndDismiss(helperIcon);

        }
    }

    private void displayTooltip(int position, int align) {
        String sMessage = "Densidade de Potência de\nIluminação Relativa Final";

        toolTipsManager.findAndDismiss(helperIcon);

        ToolTip.Builder builder = new ToolTip.Builder(this,helperIcon, constraintLayout,sMessage,position);

        builder.setAlign(align);
        builder.setBackgroundColor(Color.BLUE);
        toolTipsManager.show(builder.build());
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu){

        getMenuInflater().inflate(R.menu.main,menu);

        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) { //função necessaria para o botao de voltar no header
        switch (item.getItemId()) {
            case android.R.id.home:
                this.finish();
                return true;
            case R.id.graphic:
                if(!isLoading) {
                    ActivityHistoricActivity();
                    return true;
                }
        }
        return super.onOptionsItemSelected(item);
    }

    private void ActivityHistoricActivity(){
        Intent intent = new Intent(this,Historic.class);
        //intent.putExtra("jsonQRCode",jsonQRCode);
        startActivity(intent);

    }


}