import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store, StoreModule } from "@ngrx/store";
import { DatafilesComponent } from "datasets/datafiles/datafiles.component";
import { MockActivatedRoute, MockStore } from "shared/MockStubs";
import { rootReducer } from "state-management/reducers/root.reducer";
import { MatTableModule } from "@angular/material";
import { FileDropzoneComponent } from "./file-dropzone.component";
import * as lb from "shared/sdk/services";
import { APP_CONFIG } from "app-config.module";
import { PipesModule } from "shared/pipes/pipes.module";

const mockConfig = {};

describe("FileDropzoneComponent", () => {
  let component: FileDropzoneComponent;
  let fixture: ComponentFixture<FileDropzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        PipesModule,
        StoreModule.forRoot({ rootReducer })
      ],
      declarations: [
        FileDropzoneComponent,
        DatafilesComponent
      ]
    });
    TestBed.overrideComponent(FileDropzoneComponent, {
      set: {
        providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: APP_CONFIG, useValue: mockConfig },
          { provide: lb.AttachmentApi, useValue: mockConfig },
          { provide: Store, useClass: MockStore }
        ]
      }
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
