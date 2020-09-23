import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextoAzulDirective } from "../diretiva/texto-azul.directive";

@NgModule({
  declarations: [TextoAzulDirective],
  imports: [CommonModule],
  exports: [TextoAzulDirective],
})
export class DiretivaModule {}
