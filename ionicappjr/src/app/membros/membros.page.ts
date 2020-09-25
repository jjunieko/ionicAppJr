import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ModalDeputadoPage } from "../modal-deputado/modal-deputado.page";
import { MembrosTipagem } from "../models/membros-tipagem";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-membros",
  templateUrl: "./membros.page.html",
  styleUrls: ["./membros.page.scss"],
})
export class MembrosPage implements OnInit {
  idPartido: number;
  membros: Array<MembrosTipagem> = [];
  public loading: boolean = false;

  constructor(
    public router: ActivatedRoute,
    private apiService: ApiService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.loading = true;
    //console.log(this.router.snapshot.params.id);
    this.idPartido = this.router.snapshot.params.id;
    this.buscarMembrosDoPartido(this.idPartido);

    /*   setTimeout(() => {
      this.abrirModal();
    }, 3000); */
  }

  buscarMembrosDoPartido(idPart: number): void {
    this.apiService.getMembros(idPart).subscribe((response) => {
      console.log(response);
      this.membros = response.dados;
      this.loading = false;
    });
  }

  async abrirModal(idDeputado: number) {
    const modal = await this.modal.create({
      component: ModalDeputadoPage,
      componentProps: { idDeputado },
    });
    return await modal.present();
  }
}
