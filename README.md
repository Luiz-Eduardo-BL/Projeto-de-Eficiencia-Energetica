# Projeto-de-Eficiencia-Energetica
* Projeto focado em classificar a eficiência energética dos ambientes da Justiça Federal

## Como é feita a classificação?
* Uso do sensor de luz do aparelho e em seguida são feito os cálculos de classificação a partir das informações do ambiente analisado

## Execução do Frontend
* Apenas abrir o projeto no Android Studio e executar
> Obs: O endereço base da API fica dentro da classe Api.class cd frontend/LuxMeter/app/src/main/java/moe/feo/luxmeter/Api.java

## Backend
* Já é executado em nuvem
* Para execução local, no terminal, digite:
```cd backend/functions && npm run serve```

## Atividades Desenvolvidas

* Reuniões feitas toda quarta-feira no Meet para discursão sobre o projeto;
* Uso do Luxímetro para calibração dos aparelhos Android, os aparelhos utilizados(calibrados) e recomendados para o uso da aplicação são:
    > <strong> Xiomi Poco M4 Pro - xiaomi-21091116ag <br/>
    > Samsung Galaxy A10s - samsung-sm-a107m <br/>
    > LG K8 Plus - lge-lm-x120</strong>
* Utilização do Script em Python para carregar no banco todas os pavimentos da planilha recebida pelo JF além de gerar todos os Qr-Code das salas que foram carregadas no Banco de Dados;
* Atividades/Features que foram finalizadas no Frontend:
    > <strong> Ícone da aplicação<br/>
    > Tela de Splash<br/>
    > Tela Home<br/>
    > Tela de Leitura do Qr-Code do pavimento/bloco<br/>
    > Tela do Resultado do processamento (utilização do sensor de luz)<br/>
    > Tela do Histórico das mensurações realização.<br/></strong>

* Atividades/Features que foram finalizadas no Backend:
    > <strong>Rota do resultado da eficiência<br/>
    > Rotas para o cadastro e visualização da tabela de eficiência<br/>
    > Rota que retorna o Qr-Code dado o nome do pavimento/bloco<br/>
    > Rota para o cadastro de uma Sala no banco de dados<br/>
    > Rota de histórico de mensurações realizadas<br/></strong>


## Telas

### Tela Splash e Home

![01-02](outros/screenshots/1.png)


### Telas de Leitura do Qr-Code e Informações do Ambiente

![Qr-Code](outros/screenshots/3.png)

### Tela de Informaçãos do uso do Aplicativo e Contagem Regressiva

![Qr-Code](outros/screenshots/4.png)

### Tela de IResultados e Historico

![Medidor de Lux - Informações](outros/screenshots/5.png)
