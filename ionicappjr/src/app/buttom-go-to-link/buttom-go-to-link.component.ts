import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-buttom-go-to-link",
  templateUrl: "./buttom-go-to-link.component.html",
  styleUrls: ["./buttom-go-to-link.component.scss"],
})
export class ButtomGoToLinkComponent implements OnInit {
  @Input() name: string;
  @Input() icon: string;
  @Input() idPartido: number;

  constructor() {}

  ngOnInit() {}
}
