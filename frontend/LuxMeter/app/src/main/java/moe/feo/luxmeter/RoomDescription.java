package moe.feo.luxmeter;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

public class RoomDescription extends AppCompatActivity {

    private TextView salaText, comprimentoText, larguraText, distanciaMesaTetoText, potenciaLampadaText, qtdLampadaText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_room_description);

        getSupportActionBar().setTitle("Informações da Sala");

        salaText = findViewById(R.id.sala);
        comprimentoText = findViewById(R.id.comprimento);
        larguraText = findViewById(R.id.largura);
        distanciaMesaTetoText = findViewById(R.id.distanciaMesaTeto);
        potenciaLampadaText = findViewById(R.id.potenciaLampada);
        qtdLampadaText = findViewById(R.id.qtdLampada);

        String jsonQRCode = getIntent().getStringExtra("jsonQRCode");

        ImageView nextScreen = findViewById(R.id.nextScreen);

        nextScreen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ActivityMainActivity(jsonQRCode);
            }
        });

        try {
            JSONObject json = new JSONObject(jsonQRCode);
            String sala = json.getString("sala");
            String comprimento = Double.toString(json.getDouble("comprimento"))+"m";
            String largura = Double.toString(json.getDouble("largura"))+"m";
            String distanciaMesaTeto = Double.toString(json.getDouble("distanciaPlanoDeTrabalhoTeto"))+"m";
            String potenciaLampada = Double.toString(json.getDouble("potenciaLampada"))+"m";
            String qntLampada = Integer.toString(json.getInt("qntdLampadas"));
            salaText.setText(sala);
            comprimentoText.setText(comprimento);
            larguraText.setText(largura);
            distanciaMesaTetoText.setText(distanciaMesaTeto);
            potenciaLampadaText.setText(potenciaLampada);
            qtdLampadaText.setText(qntLampada);

        } catch (JSONException e) {
            e.printStackTrace();
            Toast.makeText(this,"Código QR Inválido!",Toast.LENGTH_LONG).show();
            this.finish();
        }

    }

    private void ActivityMainActivity(String jsonQRCode){
        Intent intent = new Intent(this,MainActivity.class);
        intent.putExtra("jsonQRCode",jsonQRCode);
        startActivity(intent);

    }
}