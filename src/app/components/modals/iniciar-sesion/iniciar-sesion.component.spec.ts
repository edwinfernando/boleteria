import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IniciarSesionComponent } from './iniciar-sesion.component';

describe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarSesionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
