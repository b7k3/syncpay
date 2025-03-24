# SyncPay - Integração Simples com a API SyncPay

O SyncPay é uma biblioteca desenvolvida para facilitar a integração com a API da SyncPay, permitindo que desenvolvedores realizem operações financeiras de forma rápida e segura. Com ele, você pode consultar saldo, verificar o status de transações e gerar cobranças via Pix sem precisar lidar diretamente com requisições HTTP.


## Instalação

```bash
$ npm install syncpay
```

## Importar e Autenticar

```typescript
import { SyncPay } from "syncpay"

const syncpay = new SyncPay({ ApiKey: "SUA CHAVE DE API" }) // Você pode obter sua chave de API em https://web.syncpay.pro/gateway/
```

## Criar Pagamento PIX

```typescript
syncpay.pix.cashIn({
    amount: 10,
	customer: {
		name: "Paulo Queiroz",
		email: "cliente@email.com",
		cpf: "02965847521",
	},
	postbackUrl: "https://exemple/webhook/"
})
```

## Criar Pagamento PIX com Split

```typescript
syncpay.pix.cashIn({
    amount: 10,
	customer: {
		name: "Paulo Queiroz",
		email: "cliente@email.com",
		cpf: "02965847521",
	},
    split: [
          {
            user_id: "leandroLima",
            percentage: 50
          },
          {
            user_id: "FelipeSilva",
            percentage: 25
          }
    ],
	postbackUrl: "https://exemple/webhook/"
})
```

## Realizar Transferência PIX

```typescript
syncpay.pix.cashOut({
    amount: 5.57,
    pixKey: "56265478451",
    pixType: "CPF",
    beneficiaryName: "Claudio Barbosa Rios",
    beneficiaryDocument: "56265478451",
    postbackUrl: "https://suaplataforma/webhook"
})
```

## Reembolsar Pagamento

```typescript
syncpay.pix.refund({
    id: 3125413,
    external_reference: "e65JzaGhjhyVQDK7TFHENKdasrn5BWO7O"
})
```

## Obter Status de um Pagamento

```typescript
syncpay.pix.status({
    idTransaction: "029d53e0454d0d9804babbf2f01195"
})
```

## Obter Saldo Atual da Conta

```typescript
syncpay.account.balance()
```