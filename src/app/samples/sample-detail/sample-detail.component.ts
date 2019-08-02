import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Sample } from "../../shared/sdk/models";
import { filter, flatMap, map } from "rxjs/operators";
import {
  getSelectedSample,
  getCurrentSample
} from "../../state-management/selectors/samples.selectors";
import { select, Store } from "@ngrx/store";
import {
  FetchSampleAction,
  FetchSamplesAction,
  SelectSampleAction
} from "../../state-management/actions/samples.actions";

@Component({
  selector: "app-sample-detail",
  templateUrl: "./sample-detail.component.html",
  styleUrls: ["./sample-detail.component.scss"]
})
export class SampleDetailComponent implements OnInit, OnDestroy {
  sample: Object;
  sample$ = this.store.pipe(select(getCurrentSample));
  private sampleId$: Observable<string>;
  private subscriptions = [];

  constructor(private route: ActivatedRoute, private store: Store<Sample>) {}

  ngOnInit() {
    this.subscriptions.push(
      this.store.pipe(select(getCurrentSample)).subscribe(sample => {
        if (sample && Object.keys(sample).length > 0) {
          this.sample = <Sample>sample;
        } else {
          console.log("Searching from URL params");
          this.route.params.subscribe(params => {
            this.store.dispatch(new FetchSampleAction(params.id));
          });
        }
      })
    );
  }
  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
