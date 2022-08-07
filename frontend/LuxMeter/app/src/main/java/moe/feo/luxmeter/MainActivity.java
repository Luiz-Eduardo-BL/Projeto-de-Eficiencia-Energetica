package moe.feo.luxmeter;

import androidx.appcompat.app.AppCompatActivity;
import androidx.transition.Fade;
import androidx.transition.Transition;
import androidx.transition.TransitionManager;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;

public class MainActivity extends AppCompatActivity {

    private static MainActivity instance;
    private SensorManager sensorManager;
    private Sensor sensor;
    private Button button;
    private TextView luxText, infoText;
    private LottieAnimationView infoAnimation, lightAnimation, countdownAnimation;
    private Runnable runnable;
    private int delay = 10000;

    Handler handler = new Handler();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;
        setContentView(R.layout.activity_main);

        getSupportActionBar().setTitle("Medidor de Lux");

        luxText = findViewById(R.id.num);

        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        if (sensorManager != null) {
            sensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
            sensorManager.registerListener(new LightChangeListener(), sensor, SensorManager.SENSOR_DELAY_NORMAL);
        } else {
            Toast.makeText(getApplicationContext(),"Este aparelho não possui sensor de luz!",Toast.LENGTH_LONG).show();
            this.finish();
        }
        button = findViewById(R.id.button);

        infoText = findViewById(R.id.infoText);
        infoAnimation = findViewById(R.id.infoAnimation);
        lightAnimation = findViewById(R.id.lightAnimation);
        countdownAnimation = findViewById(R.id.countdownAnimation);


        infoText.setVisibility(View.VISIBLE);
        infoAnimation.setVisibility(View.VISIBLE);
        button.setVisibility(View.VISIBLE);
        lightAnimation.setVisibility(View.INVISIBLE);
        luxText.setVisibility(View.INVISIBLE);
        countdownAnimation.setVisibility(View.INVISIBLE);


        button.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                Transition transition = new Fade();
                transition.setDuration(1000);
                transition.addTarget(R.id.infoText);
                transition.addTarget(R.id.infoAnimation);
                transition.addTarget(R.id.button);
                transition.addTarget(R.id.num);
                transition.addTarget(R.id.lightAnimation);
                transition.addTarget(R.id.countdownAnimation);

                TransitionManager.beginDelayedTransition(findViewById(R.id.parent), transition);

                infoText.setVisibility(View.INVISIBLE);
                infoAnimation.setVisibility(View.INVISIBLE);
                button.setVisibility(View.INVISIBLE);
                luxText.setVisibility(View.VISIBLE);
                lightAnimation.setVisibility(View.VISIBLE);
                countdownAnimation.setVisibility(View.VISIBLE);
            }
        });




    }


    public TextView getTextView() {
        return luxText;
    }

    public Button getButton() {
        return button;
    }

    public static MainActivity getInstance() {
        return instance;
    }
}