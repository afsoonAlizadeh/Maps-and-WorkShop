import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkStoreListComponent } from './list.component';

describe('WorkStoreListComponent', () => {
  let component: WorkStoreListComponent;
  let fixture: ComponentFixture<WorkStoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkStoreListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
