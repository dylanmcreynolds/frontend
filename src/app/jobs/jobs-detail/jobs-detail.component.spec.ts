import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Store, StoreModule} from '@ngrx/store';
import {MockActivatedRoute, MockStore} from '../../shared/MockStubs';


import {JobsDetailComponent} from './jobs-detail.component';
import {rootReducer} from 'state-management/reducers/root.reducer';
import {ActivatedRoute} from '@angular/router';

describe('JobsDetailComponent', () => {
  let component: JobsDetailComponent;
  let fixture: ComponentFixture<JobsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, StoreModule.forRoot({rootReducer})],
      declarations: [JobsDetailComponent]
    });
    TestBed.overrideComponent(JobsDetailComponent, {
      set: {
        providers: [
          {provide: Store, useClass: MockStore},
          {provide: ActivatedRoute, useClass: MockActivatedRoute}
        ]
      }
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
