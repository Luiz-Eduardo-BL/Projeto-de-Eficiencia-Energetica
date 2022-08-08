package moe.feo.luxmeter;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Build;
import android.os.Bundle;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;


public class Result extends AppCompatActivity {

    private TextView classificacao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        classificacao = findViewById(R.id.classificacao);

        String jsonQRCode = getIntent().getStringExtra("jsonQRCode");

        //classificacao.setText(getIntent().getStringExtra("iluminanceValue"));




        try {
            JSONObject jsonOBJ = new JSONObject(jsonQRCode);

            Double iluminanceValue = Double.valueOf(getIntent().getStringExtra("iluminanceValue").replace("lx",""));

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

                            } catch (JSONException e) {
                                e.printStackTrace();
                            }


                        }
                    }, new Response.ErrorListener() {

                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // TODO: Handle error

                        }
                    });

            queue.add(jsonObjectRequest);

        } catch (JSONException e) {
            e.printStackTrace();
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