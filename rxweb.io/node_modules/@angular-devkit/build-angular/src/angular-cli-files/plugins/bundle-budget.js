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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWJ1ZGdldC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvcGx1Z2lucy9idW5kbGUtYnVkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsK0RBQStEOztBQUUvRDs7Ozs7O0dBTUc7QUFFSCxzRUFBc0Y7QUFFdEYsOENBQWdEO0FBaUJoRDtJQUNFLFlBQW9CLE9BQWtDO1FBQWxDLFlBQU8sR0FBUCxPQUFPLENBQTJCO0lBQUksQ0FBQztJQUUzRCxLQUFLLENBQUMsUUFBYTtRQUNqQixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxXQUFnQixFQUFFLEVBQUU7WUFDdEUsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDcEMsT0FBTzthQUNSO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUMsT0FBTztvQkFDTCxNQUFNO29CQUNOLFVBQVU7b0JBQ1YsS0FBSyxFQUFFLGtDQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztpQkFDM0MsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3JCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsUUFB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QUFFO1lBQ3ZCLFVBQVUsQ0FBQyxZQUFZLEdBQUcsa0NBQWMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkY7UUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsVUFBVSxDQUFDLFVBQVUsR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoRjtRQUVELElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixVQUFVLENBQUMsV0FBVyxHQUFHLGtDQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2hCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsa0NBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUU7UUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDaEIsVUFBVSxDQUFDLFNBQVMsR0FBRyxrQ0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3RTtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQTFGRCxnREEwRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgU2l6ZSwgY2FsY3VsYXRlQnl0ZXMsIGNhbGN1bGF0ZVNpemVzIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2J1bmRsZS1jYWxjdWxhdG9yJztcbmltcG9ydCB7IEJ1ZGdldCB9IGZyb20gJy4uLy4uL2Jyb3dzZXIvc2NoZW1hJztcbmltcG9ydCB7IGZvcm1hdFNpemUgfSBmcm9tICcuLi91dGlsaXRpZXMvc3RhdHMnO1xuXG5pbnRlcmZhY2UgVGhyZXNob2xkcyB7XG4gIG1heGltdW1XYXJuaW5nPzogbnVtYmVyO1xuICBtYXhpbXVtRXJyb3I/OiBudW1iZXI7XG4gIG1pbmltdW1XYXJuaW5nPzogbnVtYmVyO1xuICBtaW5pbXVtRXJyb3I/OiBudW1iZXI7XG4gIHdhcm5pbmdMb3c/OiBudW1iZXI7XG4gIHdhcm5pbmdIaWdoPzogbnVtYmVyO1xuICBlcnJvckxvdz86IG51bWJlcjtcbiAgZXJyb3JIaWdoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1bmRsZUJ1ZGdldFBsdWdpbk9wdGlvbnMge1xuICBidWRnZXRzOiBCdWRnZXRbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEJ1bmRsZUJ1ZGdldFBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9uczogQnVuZGxlQnVkZ2V0UGx1Z2luT3B0aW9ucykgeyB9XG5cbiAgYXBwbHkoY29tcGlsZXI6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHsgYnVkZ2V0cyB9ID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbXBpbGVyLmhvb2tzLmFmdGVyRW1pdC50YXAoJ0J1bmRsZUJ1ZGdldFBsdWdpbicsIChjb21waWxhdGlvbjogYW55KSA9PiB7XG4gICAgICBpZiAoIWJ1ZGdldHMgfHwgYnVkZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBidWRnZXRzLm1hcChidWRnZXQgPT4ge1xuICAgICAgICBjb25zdCB0aHJlc2hvbGRzID0gdGhpcy5jYWxjdWxhdGUoYnVkZ2V0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBidWRnZXQsXG4gICAgICAgICAgdGhyZXNob2xkcyxcbiAgICAgICAgICBzaXplczogY2FsY3VsYXRlU2l6ZXMoYnVkZ2V0LCBjb21waWxhdGlvbilcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAgIC5mb3JFYWNoKGJ1ZGdldENoZWNrID0+IHtcbiAgICAgICAgICBidWRnZXRDaGVjay5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja01heGltdW0oYnVkZ2V0Q2hlY2sudGhyZXNob2xkcy5tYXhpbXVtV2FybmluZywgc2l6ZSwgY29tcGlsYXRpb24ud2FybmluZ3MpO1xuICAgICAgICAgICAgdGhpcy5jaGVja01heGltdW0oYnVkZ2V0Q2hlY2sudGhyZXNob2xkcy5tYXhpbXVtRXJyb3IsIHNpemUsIGNvbXBpbGF0aW9uLmVycm9ycyk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWluaW11bShidWRnZXRDaGVjay50aHJlc2hvbGRzLm1pbmltdW1XYXJuaW5nLCBzaXplLCBjb21waWxhdGlvbi53YXJuaW5ncyk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWluaW11bShidWRnZXRDaGVjay50aHJlc2hvbGRzLm1pbmltdW1FcnJvciwgc2l6ZSwgY29tcGlsYXRpb24uZXJyb3JzKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNaW5pbXVtKGJ1ZGdldENoZWNrLnRocmVzaG9sZHMud2FybmluZ0xvdywgc2l6ZSwgY29tcGlsYXRpb24ud2FybmluZ3MpO1xuICAgICAgICAgICAgdGhpcy5jaGVja01heGltdW0oYnVkZ2V0Q2hlY2sudGhyZXNob2xkcy53YXJuaW5nSGlnaCwgc2l6ZSwgY29tcGlsYXRpb24ud2FybmluZ3MpO1xuICAgICAgICAgICAgdGhpcy5jaGVja01pbmltdW0oYnVkZ2V0Q2hlY2sudGhyZXNob2xkcy5lcnJvckxvdywgc2l6ZSwgY29tcGlsYXRpb24uZXJyb3JzKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNYXhpbXVtKGJ1ZGdldENoZWNrLnRocmVzaG9sZHMuZXJyb3JIaWdoLCBzaXplLCBjb21waWxhdGlvbi5lcnJvcnMpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja01pbmltdW0odGhyZXNob2xkOiBudW1iZXIgfCB1bmRlZmluZWQsIHNpemU6IFNpemUsIG1lc3NhZ2VzOiBhbnkpIHtcbiAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICBpZiAodGhyZXNob2xkID4gc2l6ZS5zaXplKSB7XG4gICAgICAgIGNvbnN0IHNpemVEaWZmZXJlbmNlID0gZm9ybWF0U2l6ZSh0aHJlc2hvbGQgLSBzaXplLnNpemUpO1xuICAgICAgICBtZXNzYWdlcy5wdXNoKGBidWRnZXRzLCBtaW5pbXVtIGV4Y2VlZGVkIGZvciAke3NpemUubGFiZWx9LiBgXG4gICAgICAgICAgKyBgQnVkZ2V0ICR7Zm9ybWF0U2l6ZSh0aHJlc2hvbGQpfSB3YXMgbm90IHJlYWNoZWQgYnkgJHtzaXplRGlmZmVyZW5jZX0uYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja01heGltdW0odGhyZXNob2xkOiBudW1iZXIgfCB1bmRlZmluZWQsIHNpemU6IFNpemUsIG1lc3NhZ2VzOiBhbnkpIHtcbiAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICBpZiAodGhyZXNob2xkIDwgc2l6ZS5zaXplKSB7XG4gICAgICAgIGNvbnN0IHNpemVEaWZmZXJlbmNlID0gZm9ybWF0U2l6ZShzaXplLnNpemUgLSB0aHJlc2hvbGQpO1xuICAgICAgICBtZXNzYWdlcy5wdXNoKGBidWRnZXRzLCBtYXhpbXVtIGV4Y2VlZGVkIGZvciAke3NpemUubGFiZWx9LiBgXG4gICAgICAgICAgKyBgQnVkZ2V0ICR7Zm9ybWF0U2l6ZSh0aHJlc2hvbGQpfSB3YXMgZXhjZWVkZWQgYnkgJHtzaXplRGlmZmVyZW5jZX0uYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGUoYnVkZ2V0OiBCdWRnZXQpOiBUaHJlc2hvbGRzIHtcbiAgICBsZXQgdGhyZXNob2xkczogVGhyZXNob2xkcyA9IHt9O1xuICAgIGlmIChidWRnZXQubWF4aW11bVdhcm5pbmcpIHtcbiAgICAgIHRocmVzaG9sZHMubWF4aW11bVdhcm5pbmcgPSBjYWxjdWxhdGVCeXRlcyhidWRnZXQubWF4aW11bVdhcm5pbmcsIGJ1ZGdldC5iYXNlbGluZSwgJ3BvcycpO1xuICAgIH1cblxuICAgIGlmIChidWRnZXQubWF4aW11bUVycm9yKSB7XG4gICAgICB0aHJlc2hvbGRzLm1heGltdW1FcnJvciA9IGNhbGN1bGF0ZUJ5dGVzKGJ1ZGdldC5tYXhpbXVtRXJyb3IsIGJ1ZGdldC5iYXNlbGluZSwgJ3BvcycpO1xuICAgIH1cblxuICAgIGlmIChidWRnZXQubWluaW11bVdhcm5pbmcpIHtcbiAgICAgIHRocmVzaG9sZHMubWluaW11bVdhcm5pbmcgPSBjYWxjdWxhdGVCeXRlcyhidWRnZXQubWluaW11bVdhcm5pbmcsIGJ1ZGdldC5iYXNlbGluZSwgJ25lZycpO1xuICAgIH1cblxuICAgIGlmIChidWRnZXQubWluaW11bUVycm9yKSB7XG4gICAgICB0aHJlc2hvbGRzLm1pbmltdW1FcnJvciA9IGNhbGN1bGF0ZUJ5dGVzKGJ1ZGdldC5taW5pbXVtRXJyb3IsIGJ1ZGdldC5iYXNlbGluZSwgJ25lZycpO1xuICAgIH1cblxuICAgIGlmIChidWRnZXQud2FybmluZykge1xuICAgICAgdGhyZXNob2xkcy53YXJuaW5nTG93ID0gY2FsY3VsYXRlQnl0ZXMoYnVkZ2V0Lndhcm5pbmcsIGJ1ZGdldC5iYXNlbGluZSwgJ25lZycpO1xuICAgIH1cblxuICAgIGlmIChidWRnZXQud2FybmluZykge1xuICAgICAgdGhyZXNob2xkcy53YXJuaW5nSGlnaCA9IGNhbGN1bGF0ZUJ5dGVzKGJ1ZGdldC53YXJuaW5nLCBidWRnZXQuYmFzZWxpbmUsICdwb3MnKTtcbiAgICB9XG5cbiAgICBpZiAoYnVkZ2V0LmVycm9yKSB7XG4gICAgICB0aHJlc2hvbGRzLmVycm9yTG93ID0gY2FsY3VsYXRlQnl0ZXMoYnVkZ2V0LmVycm9yLCBidWRnZXQuYmFzZWxpbmUsICduZWcnKTtcbiAgICB9XG5cbiAgICBpZiAoYnVkZ2V0LmVycm9yKSB7XG4gICAgICB0aHJlc2hvbGRzLmVycm9ySGlnaCA9IGNhbGN1bGF0ZUJ5dGVzKGJ1ZGdldC5lcnJvciwgYnVkZ2V0LmJhc2VsaW5lLCAncG9zJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRocmVzaG9sZHM7XG4gIH1cbn1cbiJdfQ==