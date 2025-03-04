import { Pix } from "./pix";
import { Account } from "./account";
import base64 from "buffer"

export interface SyncPayConfig {
  ApiKey: string;
}

class InternalConfig {
  public apiKey: string;
  public apiBase: string;

  constructor(config: SyncPayConfig) {
    this.apiKey = base64.Buffer.from(config.ApiKey).toString("base64");
    this.apiBase = "https://api.syncpay.pro"
  }
}

export class SyncPay {
  private config: InternalConfig;
  public pix: Pix;
  public account: Account;



  constructor(config: SyncPayConfig) {
    if (!config.ApiKey) {
      throw new Error("API Key is required");
    }

    this.config = new InternalConfig(config);
    this.pix = new Pix(this.config);
    this.account = new Account(this.config);
   
  }
}
