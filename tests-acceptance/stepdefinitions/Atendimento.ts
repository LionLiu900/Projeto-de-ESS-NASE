import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('atividadelist')).getText().then(text => text === name));

let pAND = (p => p.then(a => a && p))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the register student page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='Atendimento']").click();
        await $("a[name='registro']").click();
    })

    
    Given(/^"([^\"]*)" already had an appointment before$/, async (name) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => sameName(elem,name)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^"([^\"]*)"´s course is "([^\"]*)"$/, async (name, course) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => pAND(sameCourse(elem,course),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^"([^\"]*)"´s CPF is "([^\"]*)"$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^"([^\"]*)"´s gender is "([^\"]*)"$/, async (name, gender) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => pAND(sameGender(elem,gender),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^"([^\"]*)"´s telephone number is "([^\"]*)"$/, async (name, tnumber) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => pAND(sameTnumber(elem,tnumber),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^I select the "([^\"]*)" option$/, async (buttonName) => {
        await element(by.buttonText(<string> buttonName)).click();
    });

    When(/^I select "([^\"]*)" at the students database page$/, async (studentName) => {
        await element(by.buttonText(<string> studentName)).click();
    });

    Then(/^I can see the name "([^\"]*)", course "([^\"]*)", CPF "([^\"]*)", gender "([^\"]*)" and telephone number "([^\"]*)" at the register student page$/, async (name, course, cpf, gender, tnumber) => {
        var allalunos : ElementArrayFinder = element.all(by.name('appointmentlist'));
        allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name),sameTnumber(elem,tnumber),sameGender(elem,gender),sameCourse(elem,course))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
})