# Safe & Sound - Documentação
O nome do meu projeto foi “Safe & Sound”, uma simulação de rede blockchain em que artistas podem gerar um registro escrito de suas obras, incluindo o nome, autor, descrição e data de criação do bloco. Esse registro é imutável e ajuda a comprovar a autenticidade e a autoria da obra.

O protótipo de blockchain foi desenvolvido em JavaScript, utilizando bibliotecas auxiliares como Mongoose, Nodemon e Express. Por se tratar de um projeto com fins didáticos, algumas boas práticas foram deixadas de lado, como ocultar a URL do banco de dados, entre outras, mas isso foi feito apenas para facilitar o trabalho dos avaliadores ao clonar o projeto.

Além disso, desenvolvi um MVP simples em React para oferecer uma representação visual mais consistente do projeto.

**Para executar o projeto, é necessário ter o Node.js instalado e executar os seguintes comandos no terminal:**

```bash
git clone https://github.com/pedrjose/SafeAndSound.git

cd api
npm install
npm start

cd mvp
npm install
npm run dev
```

**OBS: Para testar a blockchain com o MVP, é necessário que ambos os servidores estejam em execução simultaneamente.**

Se preferir não utilizar o MVP, você pode acessar a API diretamente por meio do Postman ou qualquer outro cliente de sua preferência. [Aqui está o link para a documentação da API](https://documenter.getpostman.com/view/28866924/2sAYHxn4K2), caso opte por testar a aplicação dessa forma!

# Funcionalidades Implementadas no Projeto
## 1. Criação de Wallets
A primeira funcionalidade implementada é a criação de Wallets, permitindo que os usuários registrem suas obras na blockchain, validem obras de outros usuários e sejam remunerados por isso. As Wallets são armazenadas no banco de dados MongoDB e acessadas sempre que ocorre uma transação.

As Wallets utilizam a seguinte estrutura de classe: chave pública, chave privada, frase de segurança (composta por 12 palavras) e balanço (saldo).

## 2. Cadastro de obras autorais na blockchain
Na ‘Safe & Sound’, a criação de blocos ocorre quando o usuário deseja registrar uma obra autoral. Esse bloco, ao ser solicitado em uma transação, é armazenado no MongoDB enquanto aguarda ser minerado, permanecendo com alguns de seus parâmetros como null (por exemplo, nonce, hash, prevHash, etc.)

Ao solicitar a criação de um bloco, o usuário tem uma taxa de 1 SND (a moeda fictícia da plataforma) descontada do saldo de sua carteira. Esse valor será utilizado para remunerar um minerador no futuro, quando este validar as informações do bloco que, inicialmente, estão definidas como null.

Para a criação de blocos, são necessários o título, o autor e a descrição da obra que o artista deseja registrar. Além disso, é obrigatório fornecer um par de chaves pública e privada da carteira do artista. Caso as chaves não correspondam, a solicitação de criação do bloco será recusada. Além disso, o saldo da carteira é verificado: o usuário deve ter, no mínimo, 1 SND para solicitar a criação de um bloco.

## 3. Mineração de blocos
Como sabemos, o processamento de dados em blockchains é, usualmente, realizado por mineradores — máquinas independentes que atuam como servidores — e eles são remunerados pelos seus serviços. No ‘Safe & Sound’, a mineração ocorre da mesma forma, onde um usuário cede seu poder computacional para preencher o bloco com os seguintes dados: nonce, hash e prevHash.

Uma característica interessante é que a hash também utiliza as informações da obra de arte para seu cálculo, ou seja, o registro é realmente único. Essa hash poderá servir como um certificado, atestando que você foi a primeira pessoa a deter a autoria daquela propriedade intelectual.

As remunerações pagas ao minerador variam entre 1–2 SND. Por fim, após ser minerado, o bloco é removido do MongoDB, e seu único registro passa a ser sua posição na cadeia de blocos da blockchain.

## 4. Lidando com bifurcação da cadeia principal
Para evitar que uma bifurcação ocorra, antes de um bloco ser minerado, o código verifica se o bloco a ser inserido atende aos pré-requisitos necessários para ser o próximo bloco da cadeia. No caso, ele deve possuir o parâmetro .next, pois, caso contrário, o próximo bloco poderia ser armazenado em um lugar indevido, criando uma cadeia alternativa na blockchain.

## 5. Histórico de transações na blockchain
Outra funcionalidade implementada é a possibilidade de o usuário consultar as transações nas quais participou. Nesse caso, o usuário fornece sua carteira, e a blockchain retorna um array com todas as hashes das transações, seja das que ele solicitou ou das que ele minerou.

## 6. Visualizar histórico da blockchain
Por último, temos a funcionalidade mais importante: visualizar a blockchain.

Para acessar a blockchain, basta utilizar o endpoint disponibilizado pela API, e ele retornará toda a blockchain. É importante destacar que a blockchain não está, de fato, sendo armazenada em um banco de dados. Portanto, após uma requisição mal sucedida ou qualquer outro erro, o servidor será reiniciado e, consequentemente, a blockchain também será reiniciada.

# Finalizando
Deixei vários blocos aguardando mineração. Basta usar o MVP ou a API para começar a interagir com a blockchain. Em relação ao MVP, ele foi desenvolvido de forma rápida, apenas para fornecer uma representação visual do projeto, então pode ocorrer algumas travadas ou comportamentos inesperados.
