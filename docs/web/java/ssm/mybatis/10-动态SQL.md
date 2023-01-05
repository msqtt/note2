# 动态 SQL
- Mybatis 框架的动态 SQL 技术是一种根据特定条件动态拼装 SQL 语句的功能，它存在的意义是为了解决拼接 SQL 语句字符串时的痛点问题
## if
- if 标签可通过 test 属性（即传递过来的数据）的表达式进行判断，若表达式的结果为 true，则标签中的内容会执行；反之标签中的内容不会执行
- 在 where 后面添加一个恒成立条件`1=1`
	- 这个恒成立条件并不会影响查询的结果
	- 这个`1=1`可以用来拼接`and`语句，例如：当 empName 为 null 时
	    - 如果不加上恒成立条件，则 SQL 语句为`select * from t_emp where and age = ? and sex = ? and email = ?`，此时`where`会与`and`连用，SQL 语句会报错
		- 如果加上一个恒成立条件，则 SQL 语句为`select * from t_emp where 1= 1 and age = ? and sex = ? and email = ?`，此时不报错


```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
	select * from t_emp where 1=1
	<if test="empName != null and empName !=''">
		and emp_name = #{empName}
	</if>
	<if test="age != null and age !=''">
		and age = #{age}
	</if>
	<if test="sex != null and sex !=''">
		and sex = #{sex}
	</if>
	<if test="email != null and email !=''">
		and email = #{email}
	</if>
</select>
```



## where
- where 和 if 一般结合使用：
	- 若 where 标签中的 if 条件都不满足，则 where 标签没有任何功能，即不会添加 where 关键字
	- 若 where 标签中的 if 条件满足，则 where 标签会自动添加 where 关键字，并将条件最前方多余的 and/or 去掉
```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
	select * from t_emp
	<where>
		<if test="empName != null and empName !=''">
			emp_name = #{empName}
		</if>
		<if test="age != null and age !=''">
			and age = #{age}
		</if>
		<if test="sex != null and sex !=''">
			and sex = #{sex}
		</if>
		<if test="email != null and email !=''">
			and email = #{email}
		</if>
	</where>
</select>
```
- 注意：where 标签不能去掉条件后多余的 and/or
	```xml
	<!--这种用法是错误的，只能去掉条件前面的 and/or，条件后面的不行-->
	<if test="empName != null and empName !=''">
	emp_name = #{empName} and
	</if>
	<if test="age != null and age !=''">
		age = #{age}
	</if>
	```


## trim
- trim 用于去掉或添加标签中的内容
- 常用属性
	- prefix：在 trim 标签中的内容的前面添加某些内容
	- suffix：在 trim 标签中的内容的后面添加某些内容
	- prefixOverrides：在 trim 标签中的内容的前面去掉某些内容 suffixOverrides：在 trim 标签中的内容的后面去掉某些内容
- 若 trim 中的标签都不满足条件，则 trim 标签没有任何效果，也就是只剩下`select * from t_emp`
```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
	select * from t_emp
	<trim prefix="where" suffixOverrides="and|or">
		<if test="empName != null and empName !=''">
			emp_name = #{empName} and
		</if>
		<if test="age != null and age !=''">
			age = #{age} and
		</if>
		<if test="sex != null and sex !=''">
			sex = #{sex} or
		</if>
		<if test="email != null and email !=''">
			email = #{email}
		</if>
	</trim>
</select>
```
```java
//测试类
@Test
public void getEmpByCondition() {
	SqlSession sqlSession = SqlSessionUtils.getSqlSession();
	DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);
	List<Emp> emps= mapper.getEmpByCondition(new Emp(null, "张三", null, null, null, null));
	System.out.println(emps);
}
```

![image](https://user-images.githubusercontent.com/94043894/177942606-6bdaeb7a-4320-4b5c-854d-502ac48b23d4.png)

## choose、when、otherwise
- `choose、when、otherwise`相当于`if...else if..else`
- when 至少要有一个，otherwise 至多只有一个
```xml
<select id="getEmpByChoose" resultType="Emp">
	select * from t_emp
	<where>
		<choose>
			<when test="empName != null and empName != ''">
				emp_name = #{empName}
			</when>
			<when test="age != null and age != ''">
				age = #{age}
			</when>
			<when test="sex != null and sex != ''">
				sex = #{sex}
			</when>
			<when test="email != null and email != ''">
				email = #{email}
			</when>
			<otherwise>
				did = 1
			</otherwise>
		</choose>
	</where>
</select>
```
```java
@Test
public void getEmpByChoose() {
	SqlSession sqlSession = SqlSessionUtils.getSqlSession();
	DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);
	List<Emp> emps = mapper.getEmpByChoose(new Emp(null, "张三", 23, "男", "123@qq.com", null));
	System.out.println(emps);
}
```
![image](https://user-images.githubusercontent.com/94043894/177963884-295a716b-30e7-4f6b-bd4e-83158f86644f.png)

::: tip
相当于`if a else if b else if c else d`，只会执行其中一个
:::



## foreach
- 属性：
	- collection：设置要循环的数组或集合
	- item：表示集合或数组中的每一个数据
	- separator：设置循环体之间的分隔符，分隔符前后默认有一个空格，如` , `
	- open：设置 foreach 标签中的内容的开始符
	- close：设置 foreach 标签中的内容的结束符
- 批量删除
	```xml
	<!--int deleteMoreByArray(Integer[] eids);-->
	<delete id="deleteMoreByArray">
		delete from t_emp where eid in
		<foreach collection="eids" item="eid" separator="," open="(" close=")">
			#{eid}
		</foreach>
	</delete>
	```
	```java
	@Test
	public void deleteMoreByArray() {
		SqlSession sqlSession = SqlSessionUtils.getSqlSession();
		DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);
		int result = mapper.deleteMoreByArray(new Integer[]{6, 7, 8, 9});
		System.out.println(result);
	}
	```
	![](Resources/foreach 测试结果 1.png)
- 批量添加
	```xml
	<!--int insertMoreByList(@Param("emps") List<Emp> emps);-->
	<insert id="insertMoreByList">
		insert into t_emp values
		<foreach collection="emps" item="emp" separator=",">
			(null,#{emp.empName},#{emp.age},#{emp.sex},#{emp.email},null)
		</foreach>
	</insert>
	```
	```java
	@Test
	public void insertMoreByList() {
		SqlSession sqlSession = SqlSessionUtils.getSqlSession();
		DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);
		Emp emp1 = new Emp(null,"a",1,"男","123@321.com",null);
		Emp emp2 = new Emp(null,"b",1,"男","123@321.com",null);
		Emp emp3 = new Emp(null,"c",1,"男","123@321.com",null);
		List<Emp> emps = Arrays.asList(emp1, emp2, emp3);
		int result = mapper.insertMoreByList(emps);
		System.out.println(result);
	}
	```
    ![image](https://user-images.githubusercontent.com/94043894/177985023-0948d5db-384f-4848-a8c1-3cc20341c650.png)


## SQL 片段
- sql 片段，可以记录一段公共 sql 片段，在使用的地方通过 include 标签进行引入
- 声明 sql 片段：`<sql>`标签

```xml
<sql id="empColumns">eid,emp_name,age,sex,email</sql>
```
- 引用 sql 片段：`<include>`标签
```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
	select <include refid="empColumns"></include> from t_emp
</select>
```

