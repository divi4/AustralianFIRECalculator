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
-[Annuity](https://www.educba.com/annuity-due-formula/), the difference between [annuity due and immediate](https://math.stackexchange.com/questions/1698578/compound-interest-formula-adding-annual-contributions) and the related formulas (see above hyperlink)  
-Found out how to define the correct locale data when using Intl object using [Unicode Technical Standard #35](https://unicode.org/reports/tr35/) as a reference  
-Give different lines on the same graph different tooltips  

## Things to do:   
-Fine-tune annuity calculations, margin error possibly due to in part floating point errors  
-Make the site mobile-first, responsive  
-Add calculations to determine pre-Super FIRE number  
-Add option for user to compare two different strategies and view them both on the graph  
-Add option for users to download their data as a spreadsheet and/or plain text  
-Prettify the graph  
-Add logic to alter text if user has more money in Super than their FIRE number  
-Create a proper frontend  
-Explain how the FIRE and CoastFIRE number is created  
-Add conditional that if both lines within certain range of each other, change interaction mode to index mode  
-For ease of useability, scale down pointHitRadius as retirementAge is increased beyond 75, scale it up as it is reduced  
-Add logic to create lower limit to retirement age to equal current preservation age  
-Add logic for option to determine a persons preservation age if they were born before 1 July 1964 based on their date of birth  
-Refactor code  
