import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormatarTextoMaiusculoPipe } from "../pipes/formatar-texto-maiusculo.pipe";
import { FormatarTextoMinusculoPipe } from "../pipes/formatar-texto-minusculo.pipe";

@NgModule({
  declarations: [FormatarTextoMaiusculoPipe, FormatarTextoMinusculoPipe],
  imports: [CommonModule],
  exports: [FormatarTextoMaiusculoPipe, FormatarTextoMinusculoPipe],
})
export class PipesModule {}
