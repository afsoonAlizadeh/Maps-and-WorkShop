import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailWorkShopComponent } from './detail.component';

describe('DetailWorkShopComponent', () => {
  let component: DetailWorkShopComponent;
  let fixture: ComponentFixture<DetailWorkShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailWorkShopComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWorkShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
