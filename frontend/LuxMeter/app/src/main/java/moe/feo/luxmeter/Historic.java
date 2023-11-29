package moe.feo.luxmeter;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.graphics.Paint;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.androidplot.ui.Anchor;
import com.androidplot.ui.HorizontalPositioning;
import com.androidplot.ui.VerticalPositioning;
import com.androidplot.xy.CatmullRomInterpolator;
import com.androidplot.xy.LineAndPointFormatter;
import com.androidplot.xy.PanZoom;
import com.androidplot.xy.SimpleXYSeries;
import com.androidplot.xy.StepMode;
import com.androidplot.xy.XYGraphWidget;
import com.androidplot.xy.XYPlot;
import com.androidplot.xy.XYSeries;
import java.text.FieldPosition;
import java.text.Format;
import java.text.ParsePosition;
import java.util.ArrayList;


public class Historic extends AppCompatActivity {

    private static Historic instance;

    private XYPlot plot;

    private Integer numeroDeDatas = 0;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;

        setContentView(R.layout.activity_historic);

        ActionBar actionBar = getSupportActionBar();

        actionBar.setTitle("Histórico das Medições");

        ArrayList<Double> series1Numbers = (ArrayList<Double>) getIntent().getSerializableExtra("series1Numbers");

        ArrayList<String> domainLabels = getIntent().getStringArrayListExtra("domainLabels");

        actionBar.setDisplayHomeAsUpEnabled(true); //botao de voltar no header

        plot = findViewById(R.id.plot);

        XYSeries series1 = new SimpleXYSeries(series1Numbers,
                SimpleXYSeries.ArrayFormat.Y_VALS_ONLY,"");

        LineAndPointFormatter series1Format = new LineAndPointFormatter(Color.RED,Color.GREEN,null,null);

        series1Format.setInterpolationParams(new CatmullRomInterpolator.Params(10,
                CatmullRomInterpolator.Type.Centripetal));

        plot.addSeries(series1,series1Format);

        plot.getGraph().getLineLabelStyle(XYGraphWidget.Edge.BOTTOM).setFormat(new Format() {
            @Override
            public StringBuffer format(Object obj, StringBuffer toAppendTo, FieldPosition pos) {
                int i = Math.round(((Number) obj).floatValue());

                return toAppendTo.append(domainLabels.get(i));
            }

            @Override
            public Object parseObject(String s, ParsePosition parsePosition) {
                return null;
            }
        });

        plot.setDomainStep(StepMode.SUBDIVIDE,domainLabels.size()<5 ? domainLabels.size() : 5); //Subdivisões do eixo x

        plot.getLegend().setVisible(false);//COLOCAR LEGENDA INVISÍVEL

        plot.getDomainTitle().position(0, HorizontalPositioning.ABSOLUTE_FROM_CENTER, 0, VerticalPositioning.RELATIVE_TO_BOTTOM,  Anchor.BOTTOM_MIDDLE); //CENTRALIZAR EIXO X

        plot.getGraph().getLineLabelStyle(XYGraphWidget.Edge.BOTTOM).setRotation(-45);

        plot.getGraph().setPaddingLeft(40);

        PanZoom.attach(plot, PanZoom.Pan.VERTICAL, PanZoom.Zoom.STRETCH_VERTICAL);
    }


    public static double getDivisier(int length) {
        if (length < 5){
            return 1;
        }else if (length < 10){
            return 2;
        }else if (length < 50){
            return 5;
        }else if (length < 100){
            return 10;
        }
        return 1;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) { //função necessaria para o botao de voltar no header
        switch (item.getItemId()) {
            case android.R.id.home:
                this.finish();
                return true;

        }
        return super.onOptionsItemSelected(item);
    }
}