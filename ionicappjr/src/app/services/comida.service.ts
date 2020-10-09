import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Comida } from "../models/comida";

@Injectable({
  providedIn: "root",
})
export class ComidaService {
  constructor(public storage: Storage) {
    //this.removeAll();
    //storage.set("comidas", JSON.stringify([{ nome: "comida" }]));
    /* storage.set("comidas", [{ nome: "Pizza" }]);

    // Or to get a key/value pair
    storage.get("comidas").then((val) => {
      console.log("Comidasss", val);
    }); */
  }

  public async getAll(): Promise<Comida[]> {
    let comidas = await this.storage.get("comidas");
    comidas = JSON.parse(comidas);
    return comidas;
  }

  public async salvarComida(comida: Comida, id: number): Promise<void> {
    console.log(comida, id);
    if (id || id === 0) {
      await this.update(comida, id);
      return;
    }
    await this.save(comida);
  }

  public async save(comida): Promise<void> {
    let comidas = await this.getAll();
    if (!comidas) {
      comidas = [];
    }
    comidas.push(comida);
    await this.storage.set("comidas", JSON.stringify(comidas));
  }

  public async update(comidaForm: Comida, id: number): Promise<void> {
    //comidaForm={Ovos} | id={2}
    let comidas = await this.getAll();
    comidas = await comidas.map((comidalocalStorage, key) => {
      if (id == key) {
        return comidaForm;
      }
      return comidalocalStorage;
    });

    // ComidasAtualizadas = [1 - pizza, 2 - ovos, 3 - batata]
    await this.storage.set("comidas", JSON.stringify(comidas));
  }

  public async removeAll(): Promise<void> {
    await this.storage.remove("comidas");
  }

  public async remover(index: number): Promise<void> {
    let comidas = await this.getAll();
    console.log(comidas);
    comidas.splice(index, 1);
    await this.storage.set("comidas", JSON.stringify(comidas));
    console.log(comidas);
  }

  public async getComida(key: number): Promise<Comida> {
    let comidas = await this.getAll();
    const comidasProcurada = comidas.find((comida, idC) => {
      if (idC === key) {
        return comida;
      }
    });
    return comidasProcurada;
  }
}
