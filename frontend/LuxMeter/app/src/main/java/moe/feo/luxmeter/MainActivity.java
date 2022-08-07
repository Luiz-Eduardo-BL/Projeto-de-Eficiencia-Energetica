package moe.feo.luxmeter;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private static MainActivity instance;
    private TextView text;
    private SensorManager sensorManager;
    private Sensor sensor;
    private Button button;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;

        getSupportActionBar().setTitle("Medidor de Lux");

        setContentView(R.layout.activity_main);
        text = findViewById(R.id.num);
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        if (sensorManager != null) {
            sensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
            sensorManager.registerListener(new LightChangeListener(), sensor, SensorManager.SENSOR_DELAY_NORMAL);
        } else {
            Toast.makeText(getApplicationContext(),"Este aparelho não possui sensor de luz!",Toast.LENGTH_LONG).show();
            this.finish();
        }
        button = findViewById(R.id.button);
        button.setOnClickListener(new ButtonListener());
    }

    public TextView getTextView() {
        return text;
    }

    public Button getButton() {
        return button;
    }

    public static MainActivity getInstance() {
        return instance;
    }
}