import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemEventoComponent } from './item-evento.component';

describe('ItemEventoComponent', () => {
  let component: ItemEventoComponent;
  let fixture: ComponentFixture<ItemEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEventoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
