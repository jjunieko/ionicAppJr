import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Partido } from "../models/partido";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  public partidos: Array<Partido> = [];
  public page: number = 1;
  public links: Array<any> = [];
  public carregando: any;

  constructor(
    public apiService: ApiService,
    public loading: LoadingController
  ) {}

  ngOnInit() {
    this.listarPartidos(this.page);
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

  async listarPartidos(page: number) {
    await this.showCarregando();
    this.apiService.getPartidos(page).subscribe((res) => {
      this.partidos = res.dados;
      this.links = res.links;
      this.fecharCarregando();
      //console.log(res)
    });
  }

  proximaPagina(): void {
    this.listarPartidos(++this.page);
  }

  anteriorPagina(): void {
    this.listarPartidos(--this.page);
  }

  verificarSeTemPagina(): boolean {
    const verificacao = this.links.filter((link) => {
      return link.rel === "next";
    });
    return verificacao.length > 0;
  }
}
