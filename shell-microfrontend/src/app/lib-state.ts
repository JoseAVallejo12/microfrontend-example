import { AES, enc } from 'crypto-js';
import { v4 } from 'uuid';
interface GlobalState {
  mfe1: string;
  mfe2: string;
  mfe3: string;
  shell: string;
}

export class ManageState {
  private static instance: ManageState;
  private globalState: GlobalState;
  secretKey = v4();

  private constructor() {
    this.globalState = {
      mfe1: '',
      mfe2: '',
      mfe3: '',
      shell: '',
    },
    (window as any)['globalState'] = this.globalState;
  }

  public static getInstance(): ManageState {
    if (!ManageState.instance) {
      ManageState.instance = new ManageState();
    }
    return ManageState.instance;
  }

  getGlobalStore(key: keyof GlobalState): object {
    const bytes = AES.decrypt(this.globalState[key], this.secretKey);
    const decryptedText = bytes.toString(enc.Utf8);

    return decryptedText ? JSON.parse(decryptedText) :  {}
  }

  setGlobalStore(key: keyof GlobalState, payload: object = {}): void {
    const prevState = this.getGlobalStore(key);
    let newState = {
        ...prevState,
        ...payload,
      };

    this.globalState[key] = AES.encrypt(
      JSON.stringify(newState),
      this.secretKey
    ).toString();
  }
}
