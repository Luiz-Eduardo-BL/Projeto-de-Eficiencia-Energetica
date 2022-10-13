# Projeto-de-Eficiencia-Energetica
* Projeto focado em classificar a eficiência energética dos ambientes do Tribunal Regional do Piauí

## Como é feita a classificação?
* Uso do sensor de luz do aparelho e em seguida são feito os cálculos de classificação a partir das informações da sala analisada

## Execução do Frontend
* Apenas abrir o projeto no Android Studio e executar

## Backend
* Já é executado em nuvem
* Para execução local, no terminal, digite:
```cd backend/functions && npm run serve```

## Atividades Desenvolvidas

* Reuniões feitas toda segunda-feira no Meet para discursão sobre o projeto;
* Uso do Luxímetro para calibração dos aparelhos Android, os aparelhos utilizados(calibrados) e recomendados para o uso da aplicação são:
    > <strong> Xiomi Poco M4 Pro - xiaomi-21091116ag <br/>
    > Samsung Galaxy A10s - samsung-sm-a107m <br/>
    > LG K8 Plus - lge-lm-x120</strong>
* Utilização do Script em Python para carregar no banco todas os pavimentos da planilha recebida pelo TRT além de gerar todos os Qr-Code das salas que foram carregadas no Banco de Dados;
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

### Tela Splash

![Splash](https://drive.google.com/uc?id=1-Cvt26d1PtZ8uQxHCUPnvc1nX_K-LQHq)

### Tela Home

![Home](https://drive.google.com/uc?id=1-BFuGay_AO2kVTA8HiJ2FSmXFoqIy_jQ)

### Telas de Leitura do Qr-Code

![Qr-Code](https://drive.google.com/uc?id=1-OYOvf0cCawv_XOotqyRnZt3KRnPIqo1)

### Tela de Informações do Ambiente

![Qr-Code](https://drive.google.com/uc?id=1-NYtd8dOFu0WhlA1ElqIcTMkRZXDHWH5)

### Tela de Informaçãos do uso do Aplicativo

![Medidor de Lux - Informações](https://drive.google.com/uc?id=1-5FY1LJsJ8ySd0ktFsE3G9kS-CDQBjcP)


### Tela da Contagem Regressiva para a Leitura do Sensor de Luz

![Medidor de Lux - Contagem Regressiva](https://drive.google.com/uc?id=1-2ThBH16izf-h5BEYRODja9xfBsfnvOQ)

### Telas do Resultado da Leitura do Sensor de Luz

![Medidor de Lux - Resultado](https://drive.google.com/uc?id=1-KI3lyZzIYzYH9mLmoc4xHF-Qibo2OOa)

### Tela do Histórico de Leituras

![Histórico](https://drive.google.com/uc?id=1-0HvL6UsoB-MeuTc7tAMCiL9pqAMEtzn)