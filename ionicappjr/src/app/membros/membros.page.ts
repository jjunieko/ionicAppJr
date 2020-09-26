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
    this.idPartido = this.router.snapshot.params.id;
    this.buscarMembrosDoPartido();

    /*   setTimeout(() => {
      this.abrirModal();
    }, 3000); */
  }

  buscarMembrosDoPartido(): void {
    this.loading = true;
    this.membros = [];
    this.apiService.getMembros(this.idPartido).subscribe((response) => {
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
  search(event): void {
    let valorProcurado = event.target.value;

    if (!valorProcurado) {
      this.buscarMembrosDoPartido();
      return;
    }
    this.membros = this.membros.filter((membro) => {
      return membro.nome
        .toLocaleLowerCase()
        .includes(valorProcurado.toLowerCase());
    });
  }

  clear(): void {
    this.buscarMembrosDoPartido();
  }
}
