

package net.wangxj.authority.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import com.github.pagehelper.PageHelper;

import net.wangxj.authority.dao.base.BaseSessionDaoSupport;
import net.wangxj.authority.po.AuthorityUserRoleRelationPO;
import net.wangxj.authority.dao.AuthorityUserRoleRelationDao;
import org.apache.log4j.Logger;

/**
 * created by	: wangxj
 * created time	: 2016-12-26 18:06:43
 */

@Repository("authorityUserRoleRelationDao")
public class AuthorityUserRoleRelationDaoImpl extends BaseSessionDaoSupport implements AuthorityUserRoleRelationDao{

	@SuppressWarnings("unused")
	private static Logger logger = Logger.getLogger(AuthorityUserRoleRelationDaoImpl.class);
	
	@Override
	public Integer insert(AuthorityUserRoleRelationPO authorityUserRoleRelationPo) {
		return super.getSqlSession().update("AuthorityUserRoleRelationPOMapper.insert", authorityUserRoleRelationPo);
	}
	
	
	@Override
	public Integer updateByUuid(AuthorityUserRoleRelationPO authorityUserRoleRelationPo) {
	
		return super.getSqlSession().update("AuthorityUserRoleRelationPOMapper.updateByUuid", authorityUserRoleRelationPo);
	}
	
	@Override
	public List<AuthorityUserRoleRelationPO> selectListByCondition(AuthorityUserRoleRelationPO authorityUserRoleRelationPo) {
		
		return super.getSqlSession().selectList("AuthorityUserRoleRelationPOMapper.selectByCondition", authorityUserRoleRelationPo);
	}
	
	@Override
	public List<AuthorityUserRoleRelationPO> selectPageListByCondition(AuthorityUserRoleRelationPO authorityUserRoleRelationPo, int pageNum, int limit,String order,String sort) {
		PageHelper.startPage(pageNum, limit);
		return super.getSqlSession().selectList("AuthorityUserRoleRelationPOMapper.selectByCondition", authorityUserRoleRelationPo);
	}

	@Override
	public Integer getCountByCondition(AuthorityUserRoleRelationPO authorityUserRoleRelationPo) {
		
		return (Integer)super.getSqlSession().selectOne("AuthorityUserRoleRelationPOMapper.selectCountByCondition", authorityUserRoleRelationPo);
	}
	
	/**
	 * 删除用户在一个平台下的所有角色,authorityUserRoleRelationPo里应装载user_uuid
	 */
	@Override
	public Integer deleteBy(AuthorityUserRoleRelationPO authorityUserRoleRelationPo,String platformUuid) {
		Map<String, Object> map = new HashMap<>();
		map.put("po", authorityUserRoleRelationPo);
		map.put("platformUuid", platformUuid);
		return (Integer)super.getSqlSession().selectOne("AuthorityUserRoleRelationPOMapper.delete", map);
	}


	/* (non-Javadoc)
	 * @see net.wangxj.authority.dao.AuthorityUserRoleRelationDao#deleteByPlatform(java.lang.String)
	 */
	@Override
	public Integer deleteByPlatform(String platformUuid) {
		Map<String,String> paramMap = new HashMap<>();
		paramMap.put("platformUuid", platformUuid);
		return super.getSqlSession().delete("AuthorityUserRoleRelationPOMapper.deleteByPlatform", paramMap);
	}


	/* (non-Javadoc)
	 * @see net.wangxj.authority.dao.AuthorityUserRoleRelationDao#deleteByRole(java.lang.String)
	 */
	@Override
	public Integer deleteByRole(String roleUuid) {
		return super.getSqlSession().delete("AuthorityUserRoleRelationPOMapper.deleteByRole", roleUuid);
	}


	/* (non-Javadoc)
	 * @see net.wangxj.authority.dao.AuthorityUserRoleRelationDao#deleteByUser(java.lang.String)
	 */
	@Override
	public Integer deleteByUser(String userUuid) {
		return super.getSqlSession().delete("AuthorityUserRoleRelationPOMapper.deleteByUser", userUuid);
	}
}
