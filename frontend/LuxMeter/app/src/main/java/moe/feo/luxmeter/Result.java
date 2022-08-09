package moe.feo.luxmeter;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;


public class Result extends AppCompatActivity {

    private static Result instance;
    private TextView classificacao;
    private LottieAnimationView loadingAnimation;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;
        setContentView(R.layout.activity_result);

        classificacao = findViewById(R.id.classificacao);

        loadingAnimation = findViewById(R.id.loadingAnimation);

        String jsonQRCode = getIntent().getStringExtra("jsonQRCode");

        //classificacao.setText(getIntent().getStringExtra("iluminanceValue"));




        try {
            JSONObject jsonOBJ = new JSONObject(jsonQRCode);

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

                                classificacao.setText(resultadoClassificao);
                                classificacao.setVisibility(View.VISIBLE);
                                loadingAnimation.setVisibility(View.INVISIBLE);


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

        } catch (JSONException e) {
            e.printStackTrace();
            Toast.makeText(getApplicationContext(),"Este aparelho não possui sensor de luz!",Toast.LENGTH_LONG).show();
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
}