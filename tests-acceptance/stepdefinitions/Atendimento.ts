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

    Given(/^No professional has been chosen$/, async () => {
        var professional : ElementArrayFinder = element.all(by.name('professional'));
        professional.filter(elem => sameName(elem,'Selecione o profissional')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^I ask the system to register$/, async () => {
        await request.post(base_url + "agendamento").then(body =>
        expect(body).to.include('failure')).catch(e =>
        expect(e).equal(null));
    });

    Then(/^I can see the error message$/, async () => {
        var errorMessage : ElementArrayFinder = element.all(by.name('errorMessage'));
        errorMessage.filter(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^I am at the register students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('NASE');
        await $("a[name='Marcar consulta']").click();
    })

    Given(/^the professional "([^\"]*)" is available on "([^\"]*)" "(\d*)" at "([^\"]*)"$/, async (professional, month, day, time) => {
        var allprofessinals : ElementArrayFinder = element.all(by.name('professionallist'));
        allprofessionals.filter(elem => pAVAILABLE(availableDate(elem,month, day, time),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^I select "([^\"]*)" as the "([^\"]*)"$/, async (name, listname) => {
        
    });

    When(/^I select date "([^\"]*)" "(\d*)" on "([^\"]*)"$/, async (month, day, time) => {
        
    });

    When(/^I ask the system to schedule$/, async () => {
        await request.post(base_url + "agendamento").then(body =>
        expect(body).to.include('success')).catch(e =>
        expect(e).equal(null));
    });

    Then(/^I can see the schedule appointment on "([^\"]*)" "(\d*)" at "([^\"]*)"$/, async (month, day, time) => {
        var allappointment : ElementArrayFinder = element.all(by.name('calendar'));
        allappointment.filter(elem => pAND(sameMonth(elem,month),sameDay(elem,day),sameTime(elem,time))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });


    Given(/^I am at the register students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('NASE');
        await $("a[name='Registrar alunos']").click();
    })

    Given(/^the professional "([^\"]*)" have schedule appointments on "([^\"]*)" "(\d*)" at "([^\"]*)" and "([^\"]*)"$/, async (professional, month, day, time, time2) => {
        var allschedules : ElementArrayFinder = element.all(by.name('schedulelist'));
        allschedules.filter(elem => pAVAILABLE(availableDate(elem,month, day, time, time2),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^I select "([^\"]*)" as the month$/, async (month) => {
        
    });

    Then(/^I can see "([^\"]*)"'s schedule appointments on "([^\"]*)" "(\d*)" at "([^\"]*)" and "([^\"]*)"$/, async (professional,month,day,time, time2) => {
        var allappointment : ElementArrayFinder = element.all(by.name('calendar'));
        allappointment.filter(elem => pAND(sameMonth(elem,month),sameDay(elem,day),sameTime(elem,time))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

})
