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
import android.widget.TextView;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.tomergoldst.tooltips.ToolTip;
import com.tomergoldst.tooltips.ToolTipsManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DecimalFormat;
import java.util.ArrayList;


public class Result extends AppCompatActivity implements ToolTipsManager.TipListener, View.OnClickListener {

    private static Result instance;
    private TextView classificacao, iluminacaoTitle, pavimentoTitle, pavimentoValue, areaTitle, areaValue, dprTitle, dprValue;
    private ImageView imagemEficiencia, helperIcon;

    private ConstraintLayout constraintLayout;

    private ToolTipsManager toolTipsManager;

    private static final DecimalFormat df = new DecimalFormat("0.00");

    private LottieAnimationView loadingAnimation, circleAnimation;

    private boolean isLoading = true; //flag para saber se a tela ainda está sendo carregada

    private ArrayList<Double> series1Numbers = new ArrayList<Double>();
    private ArrayList<String> domainLabels = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;
        setContentView(R.layout.activity_result);

        ActionBar actionBar = getSupportActionBar();

        actionBar.setTitle("Eficiência do Ambiente");

        actionBar.setDisplayHomeAsUpEnabled(true);

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

        try {
            JSONObject jsonOBJ = new JSONObject(jsonQRCode);

            pavimentoValue.setText("PAV. " + jsonOBJ.getString("pavimento") + " - " + jsonOBJ.getString("ambiente"));

            Double area = jsonOBJ.getDouble("largura") * jsonOBJ.getDouble("comprimento");
            areaValue.setText(df.format(area) + "m²");

            Double iluminanceValue = Double.valueOf(getIntent().getStringExtra("iluminanceValue").replace("lx", ""));
            jsonOBJ.put("iluminanciaMediaFinal", iluminanceValue);
            jsonOBJ.put("aparelho", getDeviceName());

            RequestQueue queue = Volley.newRequestQueue(this);

            String url = Api.baseURL + "eficienciaResultado";

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                    (Request.Method.POST, url, jsonOBJ, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            try {
                                String resultadoClassificao = response.getString("classificacao");
                                String resultadoDpirf = df.format(response.getDouble("densidadePotIluminacaoRelativa")) + "W/m²/100lx";

                                classificacao.setText(resultadoClassificao);

                                if (resultadoClassificao.equals("A")) {
                                    classificacao.setTextColor(Color.parseColor("#005224"));
                                } else if (resultadoClassificao.equals("B")) {
                                    classificacao.setTextColor(Color.parseColor("#669128"));
                                } else if (resultadoClassificao.equals("C")) {
                                    classificacao.setTextColor(Color.parseColor("#FDE101"));
                                } else if (resultadoClassificao.equals("D")) {
                                    classificacao.setTextColor(Color.parseColor("#F18A01"));
                                } else {
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
                                loadingAnimation.setVisibility(View.INVISIBLE);

                                isLoading = false;
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, null);

            queue.add(jsonObjectRequest);

        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(Result.instance, "Este aparelho não possui sensor de luz!", Toast.LENGTH_LONG).show();
            instance.finish();
        }
    }

    private String getDeviceName() {
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
        if (byUser) {
        }
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.helperIcon:
                int position = ToolTip.POSITION_ABOVE;
                int align = ToolTip.ALIGN_CENTER;
                displayTooltip(position, align);
                break;
            default:
                toolTipsManager.findAndDismiss(helperIcon);
        }
    }

    private void displayTooltip(int position, int align) {
        String sMessage = "Densidade de Potência de\nIluminação Relativa Final";
        toolTipsManager.findAndDismiss(helperIcon);

        ToolTip.Builder builder = new ToolTip.Builder(this, helperIcon, constraintLayout, sMessage, position);
        builder.setAlign(align);
        builder.setBackgroundColor(Color.BLUE);
        toolTipsManager.show(builder.build());
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                this.finish();
                return true;
            case R.id.graphic:
                if (!isLoading) {
                    if (series1Numbers.size() < 3) {
                        Toast.makeText(Result.instance, "Histórico disponível após 3 dias de medições realizadas!", Toast.LENGTH_LONG).show();
                        return true;
                    }
                    ActivityHistoricActivity(series1Numbers, domainLabels);
                    return true;
                }
        }
        return super.onOptionsItemSelected(item);
    }

    private void ActivityHistoricActivity(ArrayList<Double> series1Numbers, ArrayList<String> domainLabels) {
        Intent intent = new Intent(this, Historic.class);
        intent.putExtra("domainLabels", domainLabels);
        intent.putExtra("series1Numbers", series1Numbers);
        startActivity(intent);
    }
}
