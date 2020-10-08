import { Component, OnInit } from "@angular/core";
import { LoadingController, ModalController } from "@ionic/angular";
import { ModalComidaPage } from "../modal-comida/modal-comida.page";
import { ComidaService } from "../services/comida.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  public comidas = [];
  public carregar: any;

  constructor(
    public modal: ModalController,
    public comida: ComidaService,
    public laoding: LoadingController
  ) {}

  async ngOnInit() {
    await this.getComidas();
  }

  async showCarregar() {
    this.carregar = await this.laoding.create({
      message: "Agurde, estamos processando a página",
    });
    await this.carregar.present();
  }

  async fecharCarregando() {
    await this.carregar.dismiss();
  }

  async abrirModalComida() {
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
    this.comidas = await this.comida.getAll();
    console.log(this.comidas);
    this.fecharCarregando();
  }

  public async remover(id: number) {
    await this.comida.remover(id);
    this.getComidas();
  }

  /*  modal.onDidDismiss().then(async () =>{
    await this.getComidas()
   }) */
}
