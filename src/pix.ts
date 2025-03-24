import { PixCreateResponse, PixTransferResponse, PixRefundResponse, PixStatusResponse } from "./types";
import axios from "axios";

interface PixCreateParams {
  amount: number;
  customer: {
    name: string,
    email: string,
    cpf: string,
  },
  split?: Array<{
    user_id: string,
    percentage: number
  }>,
  postbackUrl: string,
}

interface PixTransferParams {
  amount: number,
  pixKey: string,
  pixType: "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "RANDOM",
  beneficiaryName: string,
  beneficiaryDocument: string,
  postbackUrl: string
}

interface PixRefundParams {
  id: number,
  external_reference: string
}

interface PixStatusParams {
  idTransaction: string
}

export class Pix {
  private config: { apiKey: string; apiBase: string; };

  constructor(config: { apiKey: string; apiBase: string; }) {
    this.config = config;
  }

  public async status(params: PixStatusParams): Promise<PixStatusResponse> {
    const { idTransaction } = params;

    try {
      const response = await axios.get(`${this.config.apiBase}/s1/getTransaction/api/getTransactionStatus.php?id_transaction=${idTransaction}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${this.config.apiKey}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  public async refund(params: PixRefundParams): Promise<PixRefundResponse> {
    const { id, external_reference } = params;

    try {
      const response = await axios.post(`${this.config.apiBase}/v1/gateway/api/refund/`, {
        id,
        external_reference
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${this.config.apiKey}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  public async cashIn(params: PixCreateParams): Promise<PixCreateResponse> {
    const { amount, customer, postbackUrl, split } = params;

    try {
      if (split) {
        const response = await axios.post(`${this.config.apiBase}/v1/gateway/api/split/`, {
          amount,
          customer,
          postbackUrl,
          split
        },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${this.config.apiKey}`,
            }
          }
        );
        return response.data;
      }
      const response = await axios.post(`${this.config.apiBase}/v1/gateway/api/`, {
        amount,
        customer,
        postbackUrl,
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${this.config.apiKey}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  public async cashOut(params: PixTransferParams): Promise<PixTransferResponse> {
    const { amount, pixKey, pixType, beneficiaryName, beneficiaryDocument, postbackUrl } = params;

    try {
      const response = await axios.post(`${this.config.apiBase}/c1/cashout/api/`, {
        amount,
        pixKey,
        pixType,
        beneficiaryName,
        beneficiaryDocument,
        postbackUrl
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${this.config.apiKey}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

}
