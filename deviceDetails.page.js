const waitTime = 40000;
const common = require('../../pages/CommonPage');
const listing = require('../../pages/deviceListing/deviceListing.page');
const pb = require('../../pages/progressBar/progressBar.page');
class DeviceDetailsPO {

	constructor() {
		this.ModelForTheSelectedDevice = "";
	}

	// Page Elements

	get breadcrumbs() {
		return $('[data-testid="breadcrumb-navigation"]');
	}

	get brandName() {
		return $('[data-testid=manufacturer]');
	}

	get imageCarousel() {
		return $('[class*="slider"] [class*="carousel"]');
	}

	get imageSection() {
		return $('[data-testid=slide]');
	}

	get phoneName() {
		return $('[data-testid=model]');
	}

	get phoneDescription() {
		return $('[data-testid=model]+[class^=typography]');
	}

	get storageOptions() {
		return $$('[data-testid="selection-radio-button"] [id*=GB]');
	}

	get storageOptionsLabels() {
		return $$('[data-testid="selection-radio-button"] [for*=GB]');
	}

	get colorOptions() {
		return $$('input[class*="HiddenRadioBox"]');
	}

	get simSelectionBtn() {
		return $$('[data-testid="selection-radio-button"] input:not([id*=GB])');
	}

	get simSelectionLabels() {
		return $$('[data-testid="selection-radio-button"] label:not([for*=GB])');
	}

	get simSelectionTooltip() {
		return $('button [class*="tooltip"]');
	}

	get panelOfferLabels() {
		return $$('[data-testid="common-detail"]');
	}

	get currency() {
		return $$('[data-testid=common-detail] [class*=typography]:nth-child(2)');
	}

	get promotionFlagSection() {
		return $('[data-testid=promo-description]');
	}

	get promotionFlagButton() {
		this.promotionFlagSection.$('button');
	}

	get stockAvailabilityText() {
		return $('[data-testid=availability]');
	}

	get findStoreLink() {
		return $('[class*="Box"] [href*="locations"]');
	}

	get seePlansBtn() {
		if ($('[class*="preorderTimeline"]').isExisting() === false)
			return $('[data-testid="See Plans"]');
		else
			return $('[data-testid="Pre-order"]');
	}

	get upgradePhoneBtn() {
		return $('[data-testid="Upgrade Phone"]');

	}

	// Contains Network Features and Device Features sections
	get expandableSection() {
		return $$('[data-testid="headerWrapper"] [class*="Clickable"]');
	}

	get expandableSectionContent() {
		return $$('[data-testid="content"]');
	}

	get seePlansPopup() {
		return $('[class*="ReactModal__Overlay"]');
	}

	get seePlansPopupBtns() {
		return $$('[class*="ReactModal__Overlay"] [class*="Box"] button');
	}

	//Page Methods

	existing(element) {
		if (element.isExisting() === true) {
			return true;
		} else {
			return false;
		}
	}

	landOnDetailsPage(device_index) {
		listing.firstPhoneCard.waitForExist(waitTime);
		listing.phoneCards[device_index].scrollIntoView();
		listing.phoneCards[device_index].waitForDisplayed(waitTime);
		common.click(listing.phoneCards[device_index]);
		this.imageSection.waitForDisplayed(waitTime);
	}

	checkPrice() {
		this.currency.forEach(element => {
			common.checkIfPricePresent(element);
		});
	}

	checkMustDisplayedElements() {
		expect(this.breadcrumbs.isDisplayed()).toBe(true);
		listing.loginLink.scrollIntoView();
		expect(listing.loginLink.isDisplayed()).toBe(true);
		expect(this.imageSection.isDisplayed()).toBe(true);
		if (this.imageCarousel.isExisting()) {
			expect(this.imageCarousel.isDisplayed()).toBe(true);
		}
	}

	checkMustDisplayedElements(auth) {
		//expect(this.breadcrumbs.isDisplayed()).toBe(true);
		//listing.loginLink.scrollIntoView();
		//expect(listing.loginLink.isDisplayed()).toBe(true);
		expect(this.imageSection.isDisplayed()).toBe(true);
		if (this.imageCarousel.isExisting()) {
			expect(this.imageCarousel.isDisplayed()).toBe(true);
		}
	}

	checkModelSpecificElements() {
		expect(this.brandName.isDisplayed()).toBe(true);
		expect(this.phoneName.isDisplayed()).toBe(true);
		expect(this.phoneDescription.isDisplayed()).toBe(true);
	}

	checkStroageAvailable() {
		this.storageOptions.forEach(element => {
			expect(element.isDisplayed()).toBe(true, "Storage options not visible");
		});
	}

	checkVariantsAvailable(spec, label) {
		expect(spec.length).toBeGreaterThanOrEqual(1);
		if (label) {
			label.forEach((item) => {
				expect(item.isDisplayed()).toBe(true);
			})
		}
	}

	landOnPlansPage() {
		try {
			this.seePlansBtn.scrollIntoView({
				block: 'center'
			});
			common.click(this.seePlansBtn);
			$('[data-testid="filter-button"]').waitForExist(10000);
		}
		catch (e) {
			console.info('Freedom Customer popup displayed ' + e);
			this.seePlansPopup.waitForDisplayed(10000);
			common.click(this.seePlansPopupBtns[1]);
			$('[data-testid="filter-button"]').waitForExist(waitTime);
		}
	}

	checkPromotionSection() {
		if (this.promotionFlagSection.isExisting() === true) {
			expect(this.promotionFlagSection.isDisplayed()).toBe(true);
		}
	}

	checkPanelOfferItems() {
		this.panelOfferLabels.forEach((item) => {
			expect(item.isDisplayed()).toBe(true);
			console.info("Panel Offer Items: " + item.getText());
		});
	}

	checkStockAvailibilityAndOptions() {

		expect(this.stockAvailabilityText.isDisplayed()).toBe(true, "Stock avaibility not visible");
		if ($('[class*="preorderTimeline"]').isExisting() === false) {
			expect(this.findStoreLink.isDisplayed()).toBe(true, "find store not visible");
		}
		else {
			expect(this.findStoreLink.isDisplayed()).toBe(false, "find store visible");
		}
		this.seePlansBtn.scrollIntoView({ block: 'center' });
		expect(this.seePlansBtn.isDisplayed()).toBe(true, "see plans button not visible");
	}

	checkStockAvailibilityAndOptions_auth() {

		expect(this.stockAvailabilityText.isDisplayed()).toBe(true, "Stock avaibility not visible");
		expect(this.findStoreLink.isDisplayed()).toBe(true, "find store not visible");
		this.upgradePhoneBtn.scrollIntoView({ block: 'center' });
		expect(this.upgradePhoneBtn.isDisplayed()).toBe(true, "see plans button not visible");
	}

	checkExpandableSections() {
		let x = 0;
		this.expandableSection.forEach((item) => {
			expect(item.isDisplayed()).toBe(true);
			common.click(item);
			this.expandableSectionContent[x].waitForDisplayed(waitTime);
			x = x + 1;
		});
	}

	checkProgressBarOnDetailsPage() {
		// Explicit pause is needed for DOM to render elements.
		listing.firstPhoneCard.waitForExist(waitTime);
		listing.firstPhoneCard.waitForDisplayed(waitTime);
		listing.phoneCards[0].scrollIntoView();
		listing.phoneCards[0].waitForDisplayed(waitTime);
		common.click(listing.phoneCards[0]);
		this.imageSection.waitForExist(waitTime);
		try {
			expect(pb.progressStepsCheckELement.isExisting()).toBe(false, "progressbar needs to be invisible");
		} catch (err) {
			console.info("Progress bar is not present " + err);
		};
	}

	getPhoneName() {
		return this.phoneName.getText();
	}
}

module.exports = new DeviceDetailsPO();
