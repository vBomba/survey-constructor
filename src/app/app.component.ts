import { Component, OnInit } from '@angular/core';
import Modeler from 'bpmn-js/lib/Modeler';
import { diagram } from 'src/assets/diagram';
import { xml2json } from 'xml-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'survey-constructor';
  json = '';
  modeler: Modeler | undefined;

  ngOnInit(): void {
    this.drawBPMN();
  }

  testExport(): void {
    this.modeler?.saveXML().then((res) => {
      console.log(res);

      const options = { compact: false, trim: true, ignoreDeclaration: true };
      this.json = JSON.parse(xml2json(diagram, options));
    });
  }

  drawBPMN(): void {
    const container = document.getElementById('container') as HTMLElement;
    this.modeler = new Modeler({
      container,
      keyboard: {
        bindTo: document,
      },
    });

    this.modeler
      .importXML(diagram)
      .then(({ warnings }) => {
        if (warnings.length) {
          console.log(warnings);
        }
        const canvas = this.modeler?.get('canvas');

        (canvas as any).zoom('fit-viewport');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
