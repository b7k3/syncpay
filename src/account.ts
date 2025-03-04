import { AccountBalanceResponse } from "./types";
import axios from "axios";

export class Account {
  private config: { apiKey: string; apiBase: string; };

  constructor(config: { apiKey: string; apiBase: string; }) {
    this.config = config;
  }


  public async balance(): Promise<AccountBalanceResponse> {
 
    try {
      const response = await axios.get(`${this.config.apiBase}/s1/getsaldo/api/`,
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
