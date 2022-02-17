const { localStorage } = window;

export default class Storage {
  private observers: Function[] = [];

  constructor(public namespace: string = 'public') {
    this.namespace = namespace;
  }

  on(fn: () => void) {
    this.observers.push(fn);
  }

  omit() {
    const value = this.getAll();
    this.observers.forEach((cb) => cb(value));
  }

  off(fn: () => void) {
    if (!fn) {
      throw Error('参数错误，需要取消监听函数');
    }

    this.observers = this.observers.filter((item) => item !== fn);
  }

  getAll(): { [key: string]: any } | null {
    const { namespace } = this;
    const value = localStorage.getItem(namespace);
    try {
      if (value === null) {
        return null;
      }
      const obj = JSON.parse(value);
      return obj;
    } catch (error) {
      return null;
    }
  }

  setItem(key: string, value: any) {
    const { namespace } = this;
    const oldStorage = this.getAll() || {};
    const newStorage = {
      ...oldStorage,
      [key]: value,
    };
    const storageValue = JSON.stringify(newStorage);
    localStorage.setItem(namespace, storageValue);

    this.omit();
  }

  getItem<T = any>(key: string) {
    const { namespace } = this;
    try {
      const value = localStorage.getItem(namespace);
      if (value === null) {
        return null;
      }
      const storageObj = JSON.parse(value);
      return storageObj[key] as T;
    } catch (error) {
      localStorage.removeItem(namespace);
      return null;
    }
  }

  removeItem(key: string) {
    const { namespace } = this;
    try {
      const value = localStorage.getItem(namespace);
      if (value === null) {
        localStorage.removeItem(namespace);
        return;
      }
      const storageObj = JSON.parse(value);
      delete storageObj[key];
      localStorage.setItem(namespace, JSON.stringify(storageObj));
    } catch (error) {
      localStorage.removeItem(namespace);
    }
    this.omit();
  }

  clear() {
    const { namespace } = this;
    localStorage.removeItem(namespace);
    this.omit();
  }
}

export const passwordStorage = new Storage('@passwordStorage');
export const tokenStorage = new Storage('@tokenStorage');
export const ossStorage = new Storage('@ossStorage');
