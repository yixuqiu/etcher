/*
 * Copyright 2020 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from 'chai';
import * as i18next from 'i18next';
import en_translation from '../../../lib/gui/app/i18n/en';

import * as progressStatus from '../../../lib/gui/app/modules/progress-status';

describe('Browser: progressStatus', function () {
	describe('.titleFromFlashState()', function () {
		beforeEach(async function () {
			this.state = {
				active: 1,
				type: 'flashing',
				failed: 0,
				percentage: 0,
				eta: 15,
				speed: 100000000000000,
			};

			await i18next.init({
				lng: 'en', // Set the default language
				resources: {
					en: en_translation,
				},
			});
		});

		it('should report 0% if percentage == 0 but speed != 0', function () {
			expect(progressStatus.titleFromFlashState(this.state)).to.equal(
				'0% Flashing...',
			);
		});

		it('should handle percentage == 0, flashing', function () {
			this.state.speed = 0;
			expect(progressStatus.titleFromFlashState(this.state)).to.equal(
				'0% Flashing...',
			);
		});

		it('should handle percentage == 0, verifying', function () {
			this.state.speed = 0;
			this.state.type = 'verifying';
			expect(progressStatus.titleFromFlashState(this.state)).to.equal(
				'0% Validating...',
			);
		});

		it('should handle percentage == 50, flashing', function () {
			this.state.percentage = 50;
			expect(progressStatus.titleFromFlashState(this.state)).to.equal(
				'50% Flashing...',
			);
		});

		it('should handle percentage == 50, verifying', function () {
			this.state.percentage = 50;
			this.state.type = 'verifying';
			expect(progressStatus.titleFromFlashState(this.state)).to.equal(
				'50% Validating...',
			);
		});

		it('should handle percentage == 100, flashing', function () {
			this.state.percentage = 100;
			expect(progressStatus.titleFromFlashState(this.state)).to.equal(
				'Finishing...',
			);
		});

		it('should handle percentage == 100, verifying', function () {
			this.state.percentage = 100;
			this.state.type = 'verifying';
			expect(progressStatus.titleFromFlashState(this.state)).to.equal(
				'Finishing...',
			);
		});

		it('should handle percentage == 100, validating', function () {
			this.state.percentage = 100;
			expect(progressStatus.titleFromFlashState(this.state)).to.equal(
				'Finishing...',
			);
		});
	});
});
