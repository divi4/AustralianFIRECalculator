# Australian FIRE Calculator  
A FIRE calculator adjusted to take into account Australian superannuation  

![Finance calculator with a graph of a persons net worth](https://i.ibb.co/wRmhgLd/calculator.png)

## Things learnt:  
-Route parameters  
-Web cookies  
-Session and local storage  
-Mongoose query methods  
-Reading documentation  
-How to use the optional attributes of the html input element  
-Learnt difference between CommonJS and RequireJS  
-Learnt how to set [CSP headers](https://content-security-policy.com/examples/)  
-[Annuity](https://www.siyavula.com/read/maths/grade-12/finance/03-finance-02), the difference between [annuity due and immediate](https://math.stackexchange.com/questions/1698578/compound-interest-formula-adding-annual-contributions) and the related formulas (see previous hyperlink)  
-Learnt the formula needed to find [future value of a annuity after a intial lump sum payment](https://www.calculatorsoup.com/calculators/financial/future-value-calculator.php#formulas)  
-Found out how to define the correct locale data when using Intl object using [Unicode Technical Standard #35](https://unicode.org/reports/tr35/) as a reference  
-Give different plotlines on the same graph different tooltips  
-How to organise and plan a project  
-[Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle), that objects/classes should be only be responsible for a single part of the program  

## Things to do:   
-Fix up Super future value calculations in createGraphData()  
-Add calculations to determine pre-Super FIRE number  
-Add pre-Super data to graph  
-Take into account Employer's Super Guarantee, ask how much employers contribute to their Super on a monthly/quarterly basis  
-Take into account Maximum super contributions base  
-Update variables in HTML to camelCase to be consistent with JavaScript file  
-Make the site mobile-first, responsive  
-Prettify the graph  
-Alter default value of current Super to be $75,000, update default graph to reflect this  
-Fine-tune annuity calculations, margin error possibly due to in part floating point errors  
-Create a proper frontend  
-Explain how the FIRE and CoastFIRE number is created  
-Add logic to alter text if user has more money in Super than their FIRE number  
-Add conditional that if both lines within $25,000~ range of each other, change interaction mode to index mode  
-For ease of useability, scale down pointHitRadius as retirementAge is increased beyond 75, scale it up as it is reduced  
-Add logic for option to determine a persons preservation age if they were born before 1 July 1964 based on their date of birth  
-Refactor code  

## Extra features to add  
-Add option for user to compare two different strategies and view them both on the graph  
-Add option for users to download their data as a spreadsheet and/or plain text  
-Add advanced options that allow users to adjust their ordinary hours worked/amount of Super earn a quarter etc.  
-Add calculator to determine amount of Super owed, and average if they're casual, per a financial quarter  
-Allow user to change interest and growth rate of each year individually, as well as provide historical datasets  