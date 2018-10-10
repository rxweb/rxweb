"use strict";
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const bundle_calculator_1 = require("../utilities/bundle-calculator");
const stats_1 = require("../utilities/stats");
class BundleBudgetPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const { budgets } = this.options;
        compiler.hooks.afterEmit.tap('BundleBudgetPlugin', (compilation) => {
            if (!budgets || budgets.length === 0) {
                return;
            }
            budgets.map(budget => {
                const thresholds = this.calculate(budget);
                return {
                    budget,
                    thresholds,
                    sizes: bundle_calculator_1.calculateSizes(budget, compilation)
                };
            })
                .forEach(budgetCheck => {
                budgetCheck.sizes.forEach(size => {
                    this.checkMaximum(budgetCheck.thresholds.maximumWarning, size, compilation.warnings);
                    this.checkMaximum(budgetCheck.thresholds.maximumError, size, compilation.errors);
                    this.checkMinimum(budgetCheck.thresholds.minimumWarning, size, compilation.warnings);
                    this.checkMinimum(budgetCheck.thresholds.minimumError, size, compilation.errors);
                    this.checkMinimum(budgetCheck.thresholds.warningLow, size, compilation.warnings);
                    this.checkMaximum(budgetCheck.thresholds.warningHigh, size, compilation.warnings);
                    this.checkMinimum(budgetCheck.thresholds.errorLow, size, compilation.errors);
                    this.checkMaximum(budgetCheck.thresholds.errorHigh, size, compilation.errors);
                });
            });
        });
    }
    checkMinimum(threshold, size, messages) {
        if (threshold) {
            if (threshold > size.size) {
                const sizeDifference = stats_1.formatSize(threshold - size.size);
                messages.push(`budgets, minimum exceeded for ${size.label}. `
                    + `Budget ${stats_1.formatSize(threshold)} was not reached by ${sizeDifference}.`);
            }
        }
    }
    checkMaximum(threshold, size, messages) {
        if (threshold) {
            if (threshold < size.size) {
                const sizeDifference = stats_1.formatSize(size.size - threshold);
                messages.push(`budgets, maximum exceeded for ${size.label}. `
                    + `Budget ${stats_1.formatSize(threshold)} was exceeded by ${sizeDifference}.`);
            }
        }
    }
    calculate(budget) {
        let thresholds = {};
        if (budget.maximumWarning) {
            thresholds.maximumWarning = bundle_calculator_1.calculateBytes(budget.maximumWarning, budget.baseline, 'pos');
        }
        if (budget.maximumError) {
            thresholds.maximumError = bundle_calculator_1.calculateBytes(budget.maximumError, budget.baseline, 'pos');
        }
        if (budget.minimumWarning) {
            thresholds.minimumWarning = bundle_calculator_1.calculateBytes(budget.minimumWarning, budget.baseline, 'neg');
        }
        if (budget.minimumError) {
            thresholds.minimumError = bundle_calculator_1.calculateBytes(budget.minimumError, budget.baseline, 'neg');
        }
        if (budget.warning) {
            thresholds.warningLow = bundle_calculator_1.calculateBytes(budget.warning, budget.baseline, 'neg');
        }
        if (budget.warning) {
            thresholds.warningHigh = bundle_calculator_1.calculateBytes(budget.warning, budget.baseline, 'pos');
        }
        if (budget.error) {
            thresholds.errorLow = bundle_calculator_1.calculateBytes(budget.error, budget.baseline, 'neg');
        }
        if (budget.error) {
            thresholds.errorHigh = bundle_calculator_1.calculateBytes(budget.error, budget.baseline, 'pos');
        }
        return thresholds;
    }
}
exports.BundleBudgetPlugin = BundleBudgetPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWJ1ZGdldC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvcGx1Z2lucy9idW5kbGUtYnVkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsK0RBQStEOztBQUUvRDs7Ozs7O0dBTUc7QUFFSCxzRUFBc0Y7QUFFdEYsOENBQWdEO0FBaUJoRDtJQUNFLFlBQW9CLE9BQWtDO1FBQWxDLFlBQU8sR0FBUCxPQUFPLENBQTJCO0lBQUksQ0FBQztJQUUzRCxLQUFLLENBQUMsUUFBYTtRQUNqQixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxXQUFnQixFQUFFLEVBQUU7WUFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxDQUFDO29CQUNMLE1BQU07b0JBQ04sVUFBVTtvQkFDVixLQUFLLEVBQUUsa0NBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO2lCQUMzQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO2lCQUNDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDckIsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDckYsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqRixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JGLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNqRixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2xGLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRixDQUFDLENBQUMsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUFDLFNBQTZCLEVBQUUsSUFBVSxFQUFFLFFBQWE7UUFDM0UsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxjQUFjLEdBQUcsa0JBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6RCxRQUFRLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxJQUFJLENBQUMsS0FBSyxJQUFJO3NCQUN6RCxVQUFVLGtCQUFVLENBQUMsU0FBUyxDQUFDLHVCQUF1QixjQUFjLEdBQUcsQ0FBQyxDQUFDO1lBQy9FLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FBQyxTQUE2QixFQUFFLElBQVUsRUFBRSxRQUFhO1FBQzNFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sY0FBYyxHQUFHLGtCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQztnQkFDekQsUUFBUSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsSUFBSSxDQUFDLEtBQUssSUFBSTtzQkFDekQsVUFBVSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUM1RSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTyxTQUFTLENBQUMsTUFBYztRQUM5QixJQUFJLFVBQVUsR0FBZSxFQUFFLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsVUFBVSxDQUFDLGNBQWMsR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDeEIsVUFBVSxDQUFDLFlBQVksR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsVUFBVSxDQUFDLGNBQWMsR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDeEIsVUFBVSxDQUFDLFlBQVksR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkIsVUFBVSxDQUFDLFVBQVUsR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkIsVUFBVSxDQUFDLFdBQVcsR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLFFBQVEsR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLFNBQVMsR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUExRkQsZ0RBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGVcbi8vIFRPRE86IGNsZWFudXAgdGhpcyBmaWxlLCBpdCdzIGNvcGllZCBhcyBpcyBmcm9tIEFuZ3VsYXIgQ0xJLlxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IFNpemUsIGNhbGN1bGF0ZUJ5dGVzLCBjYWxjdWxhdGVTaXplcyB9IGZyb20gJy4uL3V0aWxpdGllcy9idW5kbGUtY2FsY3VsYXRvcic7XG5pbXBvcnQgeyBCdWRnZXQgfSBmcm9tICcuLi8uLi9icm93c2VyL3NjaGVtYSc7XG5pbXBvcnQgeyBmb3JtYXRTaXplIH0gZnJvbSAnLi4vdXRpbGl0aWVzL3N0YXRzJztcblxuaW50ZXJmYWNlIFRocmVzaG9sZHMge1xuICBtYXhpbXVtV2FybmluZz86IG51bWJlcjtcbiAgbWF4aW11bUVycm9yPzogbnVtYmVyO1xuICBtaW5pbXVtV2FybmluZz86IG51bWJlcjtcbiAgbWluaW11bUVycm9yPzogbnVtYmVyO1xuICB3YXJuaW5nTG93PzogbnVtYmVyO1xuICB3YXJuaW5nSGlnaD86IG51bWJlcjtcbiAgZXJyb3JMb3c/OiBudW1iZXI7XG4gIGVycm9ySGlnaD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCdW5kbGVCdWRnZXRQbHVnaW5PcHRpb25zIHtcbiAgYnVkZ2V0czogQnVkZ2V0W107XG59XG5cbmV4cG9ydCBjbGFzcyBCdW5kbGVCdWRnZXRQbHVnaW4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IEJ1bmRsZUJ1ZGdldFBsdWdpbk9wdGlvbnMpIHsgfVxuXG4gIGFwcGx5KGNvbXBpbGVyOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB7IGJ1ZGdldHMgfSA9IHRoaXMub3B0aW9ucztcbiAgICBjb21waWxlci5ob29rcy5hZnRlckVtaXQudGFwKCdCdW5kbGVCdWRnZXRQbHVnaW4nLCAoY29tcGlsYXRpb246IGFueSkgPT4ge1xuICAgICAgaWYgKCFidWRnZXRzIHx8IGJ1ZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYnVkZ2V0cy5tYXAoYnVkZ2V0ID0+IHtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkcyA9IHRoaXMuY2FsY3VsYXRlKGJ1ZGdldCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYnVkZ2V0LFxuICAgICAgICAgIHRocmVzaG9sZHMsXG4gICAgICAgICAgc2l6ZXM6IGNhbGN1bGF0ZVNpemVzKGJ1ZGdldCwgY29tcGlsYXRpb24pXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgICAuZm9yRWFjaChidWRnZXRDaGVjayA9PiB7XG4gICAgICAgICAgYnVkZ2V0Q2hlY2suc2l6ZXMuZm9yRWFjaChzaXplID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNYXhpbXVtKGJ1ZGdldENoZWNrLnRocmVzaG9sZHMubWF4aW11bVdhcm5pbmcsIHNpemUsIGNvbXBpbGF0aW9uLndhcm5pbmdzKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNYXhpbXVtKGJ1ZGdldENoZWNrLnRocmVzaG9sZHMubWF4aW11bUVycm9yLCBzaXplLCBjb21waWxhdGlvbi5lcnJvcnMpO1xuICAgICAgICAgICAgdGhpcy5jaGVja01pbmltdW0oYnVkZ2V0Q2hlY2sudGhyZXNob2xkcy5taW5pbXVtV2FybmluZywgc2l6ZSwgY29tcGlsYXRpb24ud2FybmluZ3MpO1xuICAgICAgICAgICAgdGhpcy5jaGVja01pbmltdW0oYnVkZ2V0Q2hlY2sudGhyZXNob2xkcy5taW5pbXVtRXJyb3IsIHNpemUsIGNvbXBpbGF0aW9uLmVycm9ycyk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWluaW11bShidWRnZXRDaGVjay50aHJlc2hvbGRzLndhcm5pbmdMb3csIHNpemUsIGNvbXBpbGF0aW9uLndhcm5pbmdzKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNYXhpbXVtKGJ1ZGdldENoZWNrLnRocmVzaG9sZHMud2FybmluZ0hpZ2gsIHNpemUsIGNvbXBpbGF0aW9uLndhcm5pbmdzKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNaW5pbXVtKGJ1ZGdldENoZWNrLnRocmVzaG9sZHMuZXJyb3JMb3csIHNpemUsIGNvbXBpbGF0aW9uLmVycm9ycyk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWF4aW11bShidWRnZXRDaGVjay50aHJlc2hvbGRzLmVycm9ySGlnaCwgc2l6ZSwgY29tcGlsYXRpb24uZXJyb3JzKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tNaW5pbXVtKHRocmVzaG9sZDogbnVtYmVyIHwgdW5kZWZpbmVkLCBzaXplOiBTaXplLCBtZXNzYWdlczogYW55KSB7XG4gICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgaWYgKHRocmVzaG9sZCA+IHNpemUuc2l6ZSkge1xuICAgICAgICBjb25zdCBzaXplRGlmZmVyZW5jZSA9IGZvcm1hdFNpemUodGhyZXNob2xkIC0gc2l6ZS5zaXplKTtcbiAgICAgICAgbWVzc2FnZXMucHVzaChgYnVkZ2V0cywgbWluaW11bSBleGNlZWRlZCBmb3IgJHtzaXplLmxhYmVsfS4gYFxuICAgICAgICAgICsgYEJ1ZGdldCAke2Zvcm1hdFNpemUodGhyZXNob2xkKX0gd2FzIG5vdCByZWFjaGVkIGJ5ICR7c2l6ZURpZmZlcmVuY2V9LmApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tNYXhpbXVtKHRocmVzaG9sZDogbnVtYmVyIHwgdW5kZWZpbmVkLCBzaXplOiBTaXplLCBtZXNzYWdlczogYW55KSB7XG4gICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgaWYgKHRocmVzaG9sZCA8IHNpemUuc2l6ZSkge1xuICAgICAgICBjb25zdCBzaXplRGlmZmVyZW5jZSA9IGZvcm1hdFNpemUoc2l6ZS5zaXplIC0gdGhyZXNob2xkKTtcbiAgICAgICAgbWVzc2FnZXMucHVzaChgYnVkZ2V0cywgbWF4aW11bSBleGNlZWRlZCBmb3IgJHtzaXplLmxhYmVsfS4gYFxuICAgICAgICAgICsgYEJ1ZGdldCAke2Zvcm1hdFNpemUodGhyZXNob2xkKX0gd2FzIGV4Y2VlZGVkIGJ5ICR7c2l6ZURpZmZlcmVuY2V9LmApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlKGJ1ZGdldDogQnVkZ2V0KTogVGhyZXNob2xkcyB7XG4gICAgbGV0IHRocmVzaG9sZHM6IFRocmVzaG9sZHMgPSB7fTtcbiAgICBpZiAoYnVkZ2V0Lm1heGltdW1XYXJuaW5nKSB7XG4gICAgICB0aHJlc2hvbGRzLm1heGltdW1XYXJuaW5nID0gY2FsY3VsYXRlQnl0ZXMoYnVkZ2V0Lm1heGltdW1XYXJuaW5nLCBidWRnZXQuYmFzZWxpbmUsICdwb3MnKTtcbiAgICB9XG5cbiAgICBpZiAoYnVkZ2V0Lm1heGltdW1FcnJvcikge1xuICAgICAgdGhyZXNob2xkcy5tYXhpbXVtRXJyb3IgPSBjYWxjdWxhdGVCeXRlcyhidWRnZXQubWF4aW11bUVycm9yLCBidWRnZXQuYmFzZWxpbmUsICdwb3MnKTtcbiAgICB9XG5cbiAgICBpZiAoYnVkZ2V0Lm1pbmltdW1XYXJuaW5nKSB7XG4gICAgICB0aHJlc2hvbGRzLm1pbmltdW1XYXJuaW5nID0gY2FsY3VsYXRlQnl0ZXMoYnVkZ2V0Lm1pbmltdW1XYXJuaW5nLCBidWRnZXQuYmFzZWxpbmUsICduZWcnKTtcbiAgICB9XG5cbiAgICBpZiAoYnVkZ2V0Lm1pbmltdW1FcnJvcikge1xuICAgICAgdGhyZXNob2xkcy5taW5pbXVtRXJyb3IgPSBjYWxjdWxhdGVCeXRlcyhidWRnZXQubWluaW11bUVycm9yLCBidWRnZXQuYmFzZWxpbmUsICduZWcnKTtcbiAgICB9XG5cbiAgICBpZiAoYnVkZ2V0Lndhcm5pbmcpIHtcbiAgICAgIHRocmVzaG9sZHMud2FybmluZ0xvdyA9IGNhbGN1bGF0ZUJ5dGVzKGJ1ZGdldC53YXJuaW5nLCBidWRnZXQuYmFzZWxpbmUsICduZWcnKTtcbiAgICB9XG5cbiAgICBpZiAoYnVkZ2V0Lndhcm5pbmcpIHtcbiAgICAgIHRocmVzaG9sZHMud2FybmluZ0hpZ2ggPSBjYWxjdWxhdGVCeXRlcyhidWRnZXQud2FybmluZywgYnVkZ2V0LmJhc2VsaW5lLCAncG9zJyk7XG4gICAgfVxuXG4gICAgaWYgKGJ1ZGdldC5lcnJvcikge1xuICAgICAgdGhyZXNob2xkcy5lcnJvckxvdyA9IGNhbGN1bGF0ZUJ5dGVzKGJ1ZGdldC5lcnJvciwgYnVkZ2V0LmJhc2VsaW5lLCAnbmVnJyk7XG4gICAgfVxuXG4gICAgaWYgKGJ1ZGdldC5lcnJvcikge1xuICAgICAgdGhyZXNob2xkcy5lcnJvckhpZ2ggPSBjYWxjdWxhdGVCeXRlcyhidWRnZXQuZXJyb3IsIGJ1ZGdldC5iYXNlbGluZSwgJ3BvcycpO1xuICAgIH1cblxuICAgIHJldHVybiB0aHJlc2hvbGRzO1xuICB9XG59XG4iXX0=