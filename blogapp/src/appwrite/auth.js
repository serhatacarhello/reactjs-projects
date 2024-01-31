// let's start with appwrite auth service
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (userAccount) {
      return await this.login({ email, password });
    } else {
      return userAccount;
    }
  }

  async login({ email, password }) {
    return await this.account.createEmailSession(email, password);
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service:: getCurrentUser():: ", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service:: logout():: ", error);
    }
  }
}

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
//   .setProject("<PROJECT_ID>"); // Your project ID

// const account = new Account(client);

// const promise = account.create("[USER_ID]", "email@example.com", "");

const authService = new AuthService();

export default authService;
