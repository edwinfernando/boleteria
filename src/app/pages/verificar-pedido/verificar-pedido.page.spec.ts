import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificarPedidoPage } from './verificar-pedido.page';

describe('VerificarPedidoPage', () => {
  let component: VerificarPedidoPage;
  let fixture: ComponentFixture<VerificarPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificarPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
