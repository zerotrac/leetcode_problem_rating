# Leetcode Problem Rating Project

![img](http://fc.dianhsu.top/lc?user=zerotrac2&loc=cn&req=rating)

![LeetCode user zerotrac2](https://img.shields.io/badge/dynamic/json?style=for-the-badge&labelColor=black&color=%23ffa116&label=Rating&query=ratingQuantile&url=https%3A%2F%2Fbadge.xyli.tech/%2Fapi%2Fusers%2Fzerotrac2%2Fcn%2F&logo=leetcode&logoColor=yellow)

## Introduction

This frontend project has been deployed to [Github Pages](https://zerotrac.github.io/leetcode_problem_rating/).

The corresponding backend calculates the rating of the problems in leetcode weekly/biweekly contests based on [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system) as well as [Maximum likelihood estimation](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation). It is not a 100% accurate result, but sufficient for evaluating the relative difficulty of a problem.

All the data needed during calculation are obtained by web crawlers. In order not to violate any potential terms and regulations, I will NOT open-source the backend code. Moreover, as the APIs are different amongst contests, the result does not contain the problems in 1st-62nd weekly contests.

Please refer to [ratings.txt](ratings.txt) for the raw data sorted in descending order. This will be updated every week after the contest(s).

## Related Projects

- [LeetCodeRating](https://github.com/zhang-wangz/LeetCodeRating). A Chrome plugin which displays the problem ratings on offical LeetCode website. Currently, it is only available on LeetCode-China site.

- [refined-leetcode](https://github.com/XYShaoKang/refined-leetcode). A Chrome extension which integrates serveral projects and enchances the user experience. It contains features like timer, blocklist, user ratings prediction and problem ratings display. Currently, it is only available on LeetCode-China site.
