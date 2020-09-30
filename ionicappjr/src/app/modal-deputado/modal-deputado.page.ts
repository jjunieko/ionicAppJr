import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Deputado } from "../models/deputado";
import { ApiService } from "../services/api.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-modal-deputado",
  templateUrl: "./modal-deputado.page.html",
  styleUrls: ["./modal-deputado.page.scss"],
})
export class ModalDeputadoPage implements OnInit {
  @Input() idDeputado: number;

  public deputado: Deputado;
  public carregando: any;
  public carregamentoFinalizado: boolean = false;

  constructor(
    public modal: ModalController,
    public apiService: ApiService,
    public loading: LoadingController
  ) {}

  ngOnInit() {
    //console.log(this.idDeputado);
    /* setTimeout(() => {
      this.modal.dismiss();
    }, 3000); */

    this.getDeputado(this.idDeputado);
  }

  async showCarregando() {
    this.carregando = await this.loading.create({
      message: "Aguarde...",
    });
    await this.carregando.present();
  }

  async fecharCarregando() {
    await this.carregando.dismiss();
  }

  getDeputado(idDeputado: number) {
    this.showCarregando();
    this.apiService.getDeputadoId(idDeputado).subscribe((res) => {
      this.deputado = res.dados;
      this.fecharCarregando();
      this.carregamentoFinalizado = true;
    });
  }

  fecharModal(): void {
    this.modal.dismiss();
  }
}
