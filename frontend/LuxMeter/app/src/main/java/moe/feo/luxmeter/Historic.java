package moe.feo.luxmeter;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.os.Bundle;
import android.view.MenuItem;

import com.androidplot.xy.BoundaryMode;
import com.androidplot.xy.CatmullRomInterpolator;
import com.androidplot.xy.LineAndPointFormatter;
import com.androidplot.xy.PanZoom;
import com.androidplot.xy.SimpleXYSeries;
import com.androidplot.xy.StepMode;
import com.androidplot.xy.XYGraphWidget;
import com.androidplot.xy.XYPlot;
import com.androidplot.xy.XYSeries;

import java.text.DecimalFormat;
import java.text.FieldPosition;
import java.text.Format;
import java.text.ParsePosition;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Historic extends AppCompatActivity {

    private XYPlot plot;

    private Integer numeroDeDatas = 0;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_historic);

        ActionBar actionBar = getSupportActionBar();

        actionBar.setTitle("Histórico das Medições");

        //actionBar.setDisplayShowTitleEnabled(false);


        actionBar.setDisplayHomeAsUpEnabled(true); //botao de voltar no header

        plot = findViewById(R.id.plot);

        List<Double> series1Numbers = new ArrayList<Double>();

        series1Numbers.add(1.2);
        series1Numbers.add(4.3);
        series1Numbers.add(6.0);


        final String[] domainLabels = {"joao","lucas","mmmdodfjdofj"};

        //Number [] series1Numbers = {1,4,2};


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

                return toAppendTo.append(domainLabels[i]);
            }

            @Override
            public Object parseObject(String s, ParsePosition parsePosition) {
                return null;
            }
        });
        //plot.setDomainBoundaries(2,5,BoundaryMode.GROW);
        plot.setDomainStep(StepMode.SUBDIVIDE,2); //Subdivisões do eixo x


        PanZoom.attach(plot);

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