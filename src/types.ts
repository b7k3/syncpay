export interface PixCreateResponse {
  status: string,
  status_transaction: string,
  message: string,
  client_id: string,
  paymentCode: string,
  idTransaction: string,
  paymentCodeBase64: string,
  urlWebHook: string
}

export interface PixTransferResponse {
  data: {
    amount: number,
    pixKey: string,
    pixType: string,
    beneficiaryName: string,
    beneficiaryDocument: string,
    description: string,
    postbackUrl: string,
    externalreference: string,
    status: string,
    valor_liquido: string,
    idTransaction: string
  },
  status: number,
  message: string,
  error?: string
}

export interface PixRefundResponse {
  status: string,
  message: string,
  rtrId: string,
  valor: string,
  idTransaction: string
}

export interface PixStatusResponse {
  situacao: string,
  tipo: string,
  data_transacao: string,
  nome: string,
  documento?: string,
  valor_bruto: string,
  valor_liquido: string,
  status: number,
  error?: string
}

export interface AccountBalanceResponse {
  data: {
    usuario: string,
    nome: string,
    saldo_liquido: number,
    transacoes: {
      entrada: {
        quantidade: number,
        bruto?: string,
        liquido: string
      },
      saida: {
        quantidade: number,
        bruto?: string,
        liquido: string
      }
    }
  },
  status: number,
  message: string,
  error?: string
}