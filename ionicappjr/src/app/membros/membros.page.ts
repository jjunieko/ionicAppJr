import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-membros",
  templateUrl: "./membros.page.html",
  styleUrls: ["./membros.page.scss"],
})
export class MembrosPage implements OnInit {
  idPartido: number;

  constructor(public router: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    //console.log(this.router.snapshot.params.id);
    this.idPartido = this.router.snapshot.params.id;
    this.buscarMembrosDoPartido(this.idPartido);
  }
  public buscarMembrosDoPartido(idPart: number) {
    this.apiService.getMembros(idPart).subscribe((response) => {
      console.log(response);
    });
  }
}
