import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1Page } from "./tab1.page";

import { Tab1PageRoutingModule } from "./tab1-routing.module";
import { PipesModule } from "../pipes/pipes.module";
import { ButtomGoToLinkComponent } from "../buttom-go-to-link/buttom-go-to-link.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    PipesModule,
  ],

  declarations: [Tab1Page, ButtomGoToLinkComponent],
})
export class Tab1PageModule {}
