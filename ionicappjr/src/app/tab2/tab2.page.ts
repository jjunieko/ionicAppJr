import { Component, OnInit } from "@angular/core";
import {
  ActionSheetController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { ModalComidaPage } from "../modal-comida/modal-comida.page";
import { ComidaService } from "../services/comida.service";
import { Comida } from "../models/comida";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  public comidas: Array<Comida> = [];
  public carregar: any;

  constructor(
    public modal: ModalController,
    public comida: ComidaService,
    public laoding: LoadingController,
    public actionSheetController: ActionSheetController
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getComidas();
  }

  async showCarregar(): Promise<void> {
    this.carregar = await this.laoding.create({
      message: "Aguarde, processando",
    });
    await this.carregar.present();
  }

  async abrirModalComida(): Promise<void> {
    const modal = await this.modal.create({
      component: ModalComidaPage,
    });
    modal.onDidDismiss().then(async () => {
      await this.getComidas();
    });
    return await modal.present();
  }

  async editarComida(id: number): Promise<void> {
    await this.showCarregar();
    const modal = await this.modal.create({
      component: ModalComidaPage,
      componentProps: {
        id,
      },
    });
    modal.onDidDismiss().then(async () => {
      await this.getComidas();
    });

    await this.fecharCarregando();
    return await modal.present();
  }

  public async getComidas() {
    await this.showCarregar();
    setTimeout(async () => {
      this.comidas = await this.comida.getAll();
      //console.log(this.comidas);
      await this.fecharCarregando();
    }, 2000);
  }

  public async remover(id: number): Promise<void> {
    await this.comida.remover(id);
    this.getComidas();
  }

  async fecharCarregando(): Promise<void> {
    await this.carregar.dismiss();
  }

  async actionSheetDelete(id: number) {
    const actionSheet = await this.actionSheetController.create({
      header: "tem certeza que deseja deletar ?",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "sim",
          role: "destructive",
          icon: "trash",
          handler: async (): Promise<void> => {
            await this.remover(id);
          },
          //console.log("delete clicked");
        },
        {
          text: "cancelar",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("cancel cliked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
