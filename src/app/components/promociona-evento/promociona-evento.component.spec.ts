import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromocionaEventoComponent } from './promociona-evento.component';

describe('PromocionaEventoComponent', () => {
  let component: PromocionaEventoComponent;
  let fixture: ComponentFixture<PromocionaEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionaEventoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromocionaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
