import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkStoreComponent } from './workStore.component';

describe('WorkStoreComponent', () => {
  let component: WorkStoreComponent;
  let fixture: ComponentFixture<WorkStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkStoreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
