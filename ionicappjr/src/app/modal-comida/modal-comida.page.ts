import { Component, Input, OnInit } from "@angular/core";
import { LoadingController, ModalController } from "@ionic/angular";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ComidaService } from "../services/comida.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-modal-comida",
  templateUrl: "./modal-comida.page.html",
  styleUrls: ["./modal-comida.page.scss"],
})
export class ModalComidaPage implements OnInit {
  @Input() id: number;

  public isEdit: boolean = false;
  public form: FormGroup;
  public carregar: any;

  constructor(
    public modal: ModalController,
    public formBuilder: FormBuilder,
    public comida: ComidaService,
    public loading: LoadingController,
    public toastControl: ToastController
  ) {
    this.form = formBuilder.group({
      nome: [""],
      tipo: [""],
      avaliacao: [""],
      horaEntrega: [""],
      dataEntrega: [""],
      isPimenta: [""],
    });
  }

  async ngOnInit() {
    if (this.id || this.id === 0) {
      await this.editarComida();
      this.isEdit = true;
    }
    //console.log(this.id);
  }

  async showMensagem() {
    let message: string = "Comida Cadastrada com Sucesso";
    if (this.isEdit) {
      message = "Comida Atualizada com Sucesso";
    }
    const toast = await this.toastControl.create({
      message: message,
      duration: 2000,
      color: "success",
    });

    toast.present();
  }

  public fecharModal(): void {
    this.modal.dismiss();
  }

  public async submitForm() {
    await this.showCarregar();
    //console.log(this.form.value);
    this.comida.salvarComida(this.form.value, this.id);
    await this.fecharCarregando();
    this.fecharModal();
    this.showMensagem();
  }

  public async editarComida() {
    await this.showCarregar();
    const edComida = await this.comida.getComida(this.id);
    console.log(edComida);
    this.form.patchValue(edComida);
    await this.fecharCarregando();
  }

  async showCarregar() {
    this.carregar = await this.loading.create({
      message: "Aguarde...",
    });
    await this.carregar.present();
  }
  async fecharCarregando() {
    await this.carregar.dismiss();
  }
}
